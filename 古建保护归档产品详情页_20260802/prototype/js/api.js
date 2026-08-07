/* AI 请求统一发给同源后端代理。浏览器不保存、显示或发送服务端密钥。
   对话走流式输出，让"系统正在做什么"看得见。 */
window.API = (function () {
  let service = { checked: false, configured: false, limits: null };

  async function init() {
    // 清除旧版遗留的浏览器密钥；不读取、不迁移，也不再用于任何请求。
    try { localStorage.removeItem("gujian-wt-key"); } catch (e) { /* 文件预览模式可能禁用存储 */ }
    try {
      const resp = await fetch(CFG.API_STATUS, { cache: "no-store" });
      if (!resp.ok) throw new Error("STATUS_" + resp.status);
      const data = await resp.json();
      service = {
        checked: true,
        configured: Boolean(data.configured),
        provider: data.provider || "AI",
        limits: data.limits || null
      };
    } catch (e) {
      service = { checked: true, configured: false, limits: null };
    }
    return service;
  }

  function isReady() { return Boolean(service.configured); }
  function getStatus() { return Object.assign({}, service); }

  function getCfg() {
    try { return JSON.parse(localStorage.getItem(CFG.CFG_STORE) || "{}"); } catch (e) { return {}; }
  }
  function setCfg(c) { localStorage.setItem(CFG.CFG_STORE, JSON.stringify(c)); }
  function model(kind) {
    const c = getCfg();
    return kind === "vision" ? (c.vision || CFG.MODEL_VISION) : (c.chat || CFG.MODEL_CHAT);
  }

  /* 推理模型（kimi-k3、kimi-k2.6 等）不接受自定义 temperature，只允许 1。
     统一走这里：先按给定参数发，命中该限制就去掉 temperature 重发。 */
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  /* 统一出口。处理三件事：
     推理模型不接受自定义 temperature、服务端临时过载要重试、错误信息要能看懂。 */
  async function post(body, onRetry) {
    if (!isReady()) throw new Error("AI_SERVICE_UNAVAILABLE");
    const send = b => fetch(CFG.API_PROXY, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(b)
    });

    let cur = body;
    const 退避 = [2000, 5000, 9000];
    for (let i = 0; i <= 退避.length; i++) {
      let resp;
      try {
        resp = await send(cur);
      } catch (e) {
        // 网络层失败也重试
        if (i < 退避.length) { onRetry && onRetry(i + 1, "网络异常"); await sleep(退避[i]); continue; }
        throw new Error("网络请求失败，请检查网络后重试");
      }
      if (resp.ok) return resp;

      const txt = await resp.text();
      // 推理模型只允许 temperature=1，去掉参数立刻重发
      if (/invalid temperature/i.test(txt) && cur.temperature != null) {
        cur = Object.assign({}, cur); delete cur.temperature;
        continue;
      }
      // 个别模型不接受 stream_options，去掉后重发，只是拿不到流式 usage
      if (/stream_options/i.test(txt) && cur.stream_options) {
        cur = Object.assign({}, cur); delete cur.stream_options;
        continue;
      }
      // 本代理主动限流和未配置状态不重试；上游临时过载才退避
      const localLimit = resp.headers.get("x-rate-limit-reason");
      const notConfigured = resp.status === 503 && /AI 服务尚未配置/.test(txt);
      if ([429, 500, 502, 503, 504].includes(resp.status) && !localLimit && !notConfigured && i < 退避.length) {
        onRetry && onRetry(i + 1, resp.status === 429 ? "服务端忙" : "服务端错误 " + resp.status);
        await sleep(退避[i]);
        continue;
      }
      throw new Error(friendly(resp.status, txt));
    }
    throw new Error("服务端持续繁忙，重试多次仍未成功，稍后再试");
  }

  function friendly(status, txt) {
    let detail = txt;
    try { detail = JSON.parse(txt).error || txt; } catch (e) { /* 上游可能返回纯文本 */ }
    if (status === 401) return "在线识别服务认证失败，请联系维护人员";
    if (status === 403) return "当前页面没有使用在线识别服务的权限";
    if (status === 413) return "上传内容超过服务端大小限制";
    if (status === 429) return detail || "本次演示的访问次数已达上限，稍后再试";
    if (status === 503 && /尚未配置/.test(detail)) return "在线识别服务尚未连接，请联系维护人员";
    if (status === 400 && /image/i.test(txt)) return "当前图片识别方式不支持这份文件，请在“服务与偏好”中更换";
    return "服务返回错误 " + status + "：" + String(detail).slice(0, 160);
  }

  // 推理模型：正式回答在 content，思考过程在 reasoning_content，且思考很占 token
  function isReasoner(m) { return /^kimi-k/.test(m || ""); }

  /* 流式对话。onDelta(content片段, content全文, reasoning全文) 逐字回调。
     history: [{role, content}]，不含 system。
     opts.step 给出步骤名时记入记账；流式响应请求带回 usage，拿不到就只记耗时。 */
  async function chat(history, onDelta, opts) {
    opts = opts || {};
    const m = model("chat");
    const t0 = Date.now();
    const resp = await post({
      model: m,
      max_tokens: isReasoner(m) ? 6000 : 1200,   // 推理模型要留够思考的额度，否则正式回答会被挤没
      temperature: 0.3,
      stream: true,
      stream_options: { include_usage: true },
      messages: [{ role: "system", content: CFG.SYSTEM }].concat(history)
    });

    const reader = resp.body.getReader();
    const dec = new TextDecoder();
    let buf = "", full = "", think = "", finish = null, usage = null;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop();
      for (const line of lines) {
        const s = line.trim();
        if (!s.startsWith("data:")) continue;
        const payload = s.slice(5).trim();
        if (payload === "[DONE]") continue;
        try {
          const j = JSON.parse(payload);
          if (j.usage) usage = j.usage;
          const c = j.choices?.[0];
          if (c?.finish_reason) finish = c.finish_reason;
          const d = c?.delta?.content || "";
          const r = c?.delta?.reasoning_content || "";
          if (r) { think += r; onDelta && onDelta("", full, think); }
          if (d) { full += d; onDelta && onDelta(d, full, think); }
        } catch (e) { /* 忽略不完整分片 */ }
      }
    }

    // 此前流式对话不进记账，README 说的"每次调用都记"对自由问答不成立
    if (opts.step && window.Metrics) {
      Metrics.record(opts.step, Math.round((Date.now() - t0) / 1000), usage || {}, m);
    }

    // 推理占满额度导致没有正式回答时，明确告知而不是回一片空白
    if (!full.trim()) {
      full = think.trim()
        ? "这次没有生成完整回答。请在“服务与偏好”中更换文字整理方式后重试。"
        : "这次没有返回内容，请稍后重试。";
    }
    return { text: full, think: think };
  }

  /* 视觉识别。dataUrl 为压缩后的 base64 图片。
     实测：moonshot-v1-128k-vision-preview 约 20 秒；推理模型 kimi-k3 约 217 秒且会耗尽 token，不使用。 */
  async function recognize(dataUrl, ctx) {
    const m = model("vision");
    const body = {
      model: m,
      max_tokens: 4000,
      temperature: 0.2,
      messages: [{ role: "user", content: [
        { type: "image_url", image_url: { url: dataUrl } },
        { type: "text", text: CFG.visionPrompt(ctx) }
      ]}]
    };
    // kimi 系列默认开思考，识别这类任务思考会拖很久且占额度，关掉
    if (isReasoner(m)) body.thinking = { type: "disabled" };
    const t0 = Date.now();
    const resp = await post(body);
    const data = await resp.json();
    if (window.Metrics) {
      Metrics.record("构件识别", Math.round((Date.now() - t0) / 1000), data.usage || {}, m);
    }
    const txt = (data.choices?.[0]?.message?.content || "").trim()
      .replace(/^```json?\s*/i, "").replace(/```\s*$/, "");
    const parsed = JSON.parse(txt);
    return { parsed, usage: data.usage };
  }

  /* 生成修改建议。返回结构化指令，由前端渲染成可应用的卡片。
     模型只提议，不直接改数据。 */
  async function proposeEdits(context, instruction, onRetry) {
    const m = model("chat");
    const body = {
      model: m,
      max_tokens: isReasoner(m) ? 8000 : 2500,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "user", content: context },
        { role: "assistant", content: "收到，我已经读到工作区当前的完整数据。" },
        { role: "user", content: CFG.editPrompt(instruction) }
      ]
    };
    if (isReasoner(m)) body.thinking = { type: "disabled" };  // 提议不需要长思考，要的是快和稳
    let resp;
    try {
      resp = await post(body, onRetry);
    } catch (e) {
      // 个别模型不支持 json_object，退回普通模式
      if (/response_format|json_object/i.test(String(e.message || e))) {
        delete body.response_format;
        resp = await post(body, onRetry);
      } else throw e;
    }
    const data = await resp.json();
    const txt = (data.choices?.[0]?.message?.content || "").trim()
      .replace(/^```json?\s*/i, "").replace(/```\s*$/, "");
    if (!txt) throw new Error("这次没有返回内容，请稍后重试");
    return JSON.parse(txt);
  }

  /* 带图的 JSON 任务。用户拖进来的真实文件走这里，
     不再只让模型读预先整理好的文字。 */
  async function visionTask(dataUrl, prompt, opts) {
    opts = opts || {};
    const m = model("vision");
    const body = {
      model: m,
      max_tokens: opts.maxTokens || 4000,
      temperature: 0.2,
      messages: [{ role: "user", content: [
        { type: "image_url", image_url: { url: dataUrl } },
        { type: "text", text: prompt }
      ]}]
    };
    if (isReasoner(m)) body.thinking = { type: "disabled" };
    const t0 = Date.now();
    const resp = await post(body, opts.onRetry);
    const data = await resp.json();
    const txt = (data.choices?.[0]?.message?.content || "").trim()
      .replace(/^```json?\s*/i, "").replace(/```\s*$/, "");
    if (!txt) throw new Error("这次没有返回内容，请稍后重试");
    const parsed = JSON.parse(txt);
    if (window.Metrics) {
      Metrics.record(opts.step || "视觉任务", Math.round((Date.now() - t0) / 1000),
        data.usage || {}, m);
    }
    return parsed;
  }

  /* 通用 JSON 任务。主流程里每个需要理解的步骤都走这里，
     这样"AI 参与了哪些步骤"是可查的，不是嘴上说说。 */
  async function jsonTask(prompt, opts) {
    opts = opts || {};
    const m = model("chat");
    const body = {
      model: m,
      max_tokens: opts.maxTokens || (isReasoner(m) ? 6000 : 2000),
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }]
    };
    if (isReasoner(m)) body.thinking = { type: "disabled" };
    const t0 = Date.now();
    let resp;
    try {
      resp = await post(body, opts.onRetry);
    } catch (e) {
      if (/response_format|json_object/i.test(String(e.message || e))) {
        delete body.response_format;
        resp = await post(body, opts.onRetry);
      } else throw e;
    }
    const data = await resp.json();
    const txt = (data.choices?.[0]?.message?.content || "").trim()
      .replace(/^```json?\s*/i, "").replace(/```\s*$/, "");
    if (!txt) throw new Error("这次没有返回内容，请稍后重试");
    const parsed = JSON.parse(txt);
    // 记账：耗时和 token 都记下来，效率是否提升要靠这些数字说话
    if (window.Metrics) {
      Metrics.record(opts.step || "未命名", Math.round((Date.now() - t0) / 1000),
        data.usage || {}, m);
    }
    return parsed;
  }

  /* 意图分发。用户在对话里说的话由模型判断对应哪个动作，不再靠关键词匹配。
     这里只做判断不做执行，动作由编排层校验后执行。 */
  async function dispatch(sysDesc, userText, tools) {
    const m = model("chat");
    const body = {
      model: m,
      max_tokens: 400,
      temperature: 0.1,
      messages: [
        { role: "system", content: sysDesc },
        { role: "user", content: userText }
      ],
      tools: tools,
      tool_choice: "auto"
    };
    if (isReasoner(m)) body.thinking = { type: "disabled" };
    const t0 = Date.now();
    const resp = await post(body);
    const data = await resp.json();
    if (window.Metrics) {
      Metrics.record("意图分发", Math.round((Date.now() - t0) / 1000), data.usage || {}, m);
    }
    const msg = data.choices?.[0]?.message || {};
    const tc = (msg.tool_calls || [])[0];
    if (!tc || !tc.function) return { name: null, args: {} };
    let args = {};
    try { args = JSON.parse(tc.function.arguments || "{}"); } catch (e) { /* 参数解析失败按无参处理 */ }
    return { name: tc.function.name, args };
  }

  /* 读本地图片并压缩，控制上传体积 */
  function readImage(file, maxEdge) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onerror = rej;
      fr.onload = () => {
        const img = new Image();
        img.onerror = rej;
        img.onload = () => {
          const m = maxEdge || 1024;
          const sc = Math.min(1, m / Math.max(img.width, img.height));
          const cv = document.createElement("canvas");
          cv.width = Math.round(img.width * sc);
          cv.height = Math.round(img.height * sc);
          cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
          res(cv.toDataURL("image/jpeg", 0.82));
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  /* 把 assets 里的图转成 base64，供真实识别用。
     同源图片不能设 crossOrigin：一旦设了就要求服务器返回 CORS 头，
     而 python http.server 不返回，图片会直接加载失败。 */
  function urlToDataUrl(url, maxEdge) {
    return new Promise((res, rej) => {
      const img = new Image();
      const sameOrigin = !/^https?:\/\//i.test(url) || url.indexOf(location.origin) === 0;
      if (!sameOrigin) img.crossOrigin = "anonymous";
      img.onerror = () => rej(new Error("图片读取失败：" + url +
        "。若是直接双击 index.html 打开的，请改用本地服务方式访问。"));
      img.onload = () => {
        const m = maxEdge || 1024;
        const sc = Math.min(1, m / Math.max(img.width, img.height));
        const cv = document.createElement("canvas");
        cv.width = Math.round(img.width * sc);
        cv.height = Math.round(img.height * sc);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        res(cv.toDataURL("image/jpeg", 0.82));
      };
      img.src = url;
    });
  }

  return { init, isReady, getStatus, getCfg, setCfg, model, isReasoner,
           chat, recognize, proposeEdits, jsonTask, visionTask, dispatch, readImage, urlToDataUrl };
})();

/* 设置：服务状态、模型与识别数据源。服务端密钥不进入浏览器。 */
window.Settings = (function () {

  function open() {
    const modal = document.getElementById("modal");
    const body = document.getElementById("modalBody");
    const cfg = API.getCfg();
    const status = API.getStatus();
    const limits = status.limits;
    const statusText = status.configured
      ? "在线识别服务已连接。访问密钥只保存在服务器，浏览器不会显示。"
      : "在线识别服务尚未连接。请由维护人员完成服务配置后重新启动。";
    const limitText = limits
      ? "使用上限：每分钟 " + limits.perMinute + " 次，每位访客每日 " + limits.perDay +
        " 次；单个文件不超过 " + limits.maxRequestMB + "MB。"
      : "";

    body.innerHTML =
      '<div class="note"><b>在线识别服务</b><br>' + UI.esc(statusText) +
      (limitText ? "<br>" + UI.esc(limitText) : "") + "</div>" +
      "<label>文字整理</label>" +
      '<select id="fChat">' +
      CFG.CHAT_MODELS.map(o =>
        '<option value="' + o.id + '"' + ((cfg.chat || CFG.MODEL_CHAT) === o.id ? " selected" : "") + ">" +
        o.id + "　" + o.note + "</option>").join("") +
      "</select>" +
      "<label>图片识别</label>" +
      '<select id="fVision">' +
      CFG.VISION_MODELS.map(o =>
        '<option value="' + o.id + '"' + ((cfg.vision || CFG.MODEL_VISION) === o.id ? " selected" : "") + ">" +
        o.id + "　" + o.note + "</option>").join("") +
      "</select>" +
      '<div class="hint" style="margin:-6px 0 12px;line-height:1.8">' +
      "括号内是 2026-08-06 使用同一照片和同一问题得到的测试结果。<br>" +
      "这些选项供维护和测试使用，不会改变已经保存的项目资料。</div>" +
      "<label>本次识别方式</label>" +
      '<div style="margin-bottom:12px">' +
      '<label style="font-weight:400"><input type="radio" name="src" value="local"' +
      (!Store.get().真实调用 ? " checked" : "") + "> 使用已核对的示例结果（默认）</label>" +
      '<label style="font-weight:400"><input type="radio" name="src" value="live"' +
      (Store.get().真实调用 ? " checked" : "") + "> 每次重新识别上传资料</label>" +
      '<div class="hint">示例结果中的构件名称已经核对，图上位置由人工标注。重新识别可以处理新资料，但仍需专业人员核对名称和位置。</div></div>' +
      metricsHTML() +
      '<div class="btn-row"><button class="btn" id="fSave">保存</button>' +
      '<button class="btn-line" id="fTest">测试连接</button>' +
      '<button class="btn-ghost" id="fClearM">清空使用记录</button>' +
      '<span class="hint" id="fMsg"></span></div>';

    modal.classList.remove("hidden");
    document.getElementById("modalTitle").textContent = "服务与偏好";

    document.getElementById("fSave").onclick = () => {
      API.setCfg({
        chat: document.getElementById("fChat").value,
        vision: document.getElementById("fVision").value
      });
      Store.get().真实调用 = document.querySelector('input[name=src]:checked').value === "live";
      Store.emit();
      document.getElementById("fMsg").textContent = "已保存";
      setTimeout(close, 600);
    };

    document.getElementById("fClearM").onclick = async () => {
      const ok = await UI.askConfirm({ title: "清空使用记录",
        desc: "在线处理次数、耗时和采用情况会清零，项目资料不会改变。",
        okLabel: "确认清空" });
      if (!ok) return;
      Metrics.reset();
      open();
    };

    document.getElementById("fTest").onclick = async () => {
      const msg = document.getElementById("fMsg");
      msg.textContent = "正在检查连接…";
      try {
        await API.init();
        if (!API.isReady()) throw new Error("在线识别服务尚未连接");
        const r = await API.chat([{ role: "user", content: "回复两个字：可用" }], null);
        msg.textContent = "连接正常，服务返回：" + (r.text || "").slice(0, 30);
      } catch (e) {
        msg.textContent = "失败：" + String(e.message || e).slice(0, 80);
      }
    };
  }

  /* 效率与成本记账。13-3 说要证明效率提升，那就得先把数字记下来。 */
  function metricsHTML() {
    const m = Metrics.summary();
    if (!m.调用数 && !m.处理总数) {
      return '<div class="card" style="margin-bottom:14px"><div class="card-title">在线处理记录</div>' +
        '<div class="hint">还没有使用记录。处理过新资料后，这里会显示各步骤耗时、结果采用情况和失败次数，便于核对实际效率。</div></div>';
    }
    const 步骤行 = Object.keys(m.按步骤).map(k => {
      const g = m.按步骤[k];
      return "<tr><td>" + UI.esc(k) + "</td><td>" + g.次数 + "</td><td>" +
        g.秒 + " 秒</td><td>" + g.tokens + "</td></tr>";
    }).join("");
    return '<div class="card" style="margin-bottom:14px"><div class="card-title">在线处理记录</div>' +
      '<dl class="kv"><dt>处理次数</dt><dd>' + m.调用数 + " 次，累计 " + m.总秒 +
      " 秒，平均 " + m.平均秒 + " 秒</dd>" +
      "<dt>文字处理量</dt><dd>" + m.总token + "，估算费用约 " + m.估算成本元 + " 元</dd>" +
      "<dt>识别结果</dt><dd>" +
      (m.处理总数
        ? "直接采用 " + m.采用 + "，人工改过 " + m.修改 + "，删除 " + m.删除 +
          "，忽略 " + m.忽略 + "；直接采用率 " + m.直接采用率 + "%"
        : "尚无") + "</dd>" +
      "<dt>未完成处理</dt><dd>失败 " + m.失败数 + " 次，改用示例结果 " + m.降级数 + " 次</dd></dl>" +
      (步骤行 ? '<div style="margin-top:10px">' +
        UI.table(["步骤", "次数", "耗时", "文字处理量"], [步骤行]) + "</div>" : "") +
      '<div class="hint" style="margin-top:8px">这里记录的是在线处理情况。要判断是否真正节省时间，还需要在真实项目中记录人工完成同一步骤所需的时间。</div></div>';
  }

  function close() { document.getElementById("modal").classList.add("hidden"); }

  return { open, close };
})();

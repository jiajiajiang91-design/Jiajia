/* 效率与成本记账。
   13-3 定义了质量、成本、效率、责任、采用、交互六类指标，但产品里一条都没记，
   所以"AI 提升效率"到现在仍是假设。这里把能测的先测起来：
   每次模型调用的耗时和 token、AI 结果被直接采用还是被改被弃、失败和降级次数。 */
window.Metrics = (function () {
  const LS = "gujian-wt-metrics";
  let M = null;

  function fresh() {
    return {
      调用: [],        // {步骤, 秒, tokens, 模型, 时间}
      采用: [],        // {对象, 动作: 采用|修改|删除|忽略, 时间}
      失败: [],        // {步骤, 原因, 时间}
      降级: [],        // {步骤, 原因, 时间}
      人工耗时: {}     // {步骤: 秒} 由用户自行记录，用于和 AI 前后对比
    };
  }
  function load() {
    try { M = JSON.parse(localStorage.getItem(LS)) || fresh(); } catch (e) { M = fresh(); }
    if (!M.调用) M = fresh();
  }
  function save() { try { localStorage.setItem(LS, JSON.stringify(M)); } catch (e) {} }

  function now() { return new Date().toLocaleString("zh-CN", { hour12: false }); }

  function record(步骤, 秒, usage, 模型) {
    M.调用.push({ 步骤, 秒, tokens: usage.total_tokens || 0, 模型, 时间: now() });
    save();
  }
  function adopt(对象, 动作) {
    M.采用.push({ 对象, 动作, 时间: now() });
    save();
  }
  function fail(步骤, 原因) { M.失败.push({ 步骤, 原因: String(原因).slice(0, 120), 时间: now() }); save(); }
  function fallback(步骤, 原因) { M.降级.push({ 步骤, 原因, 时间: now() }); save(); }

  function get() { return M; }
  function reset() { M = fresh(); save(); }

  /* 汇总：这些数字就是回答"AI 到底帮了多少"的依据 */
  function summary() {
    const 调用数 = M.调用.length;
    const 总秒 = M.调用.reduce((a, b) => a + (b.秒 || 0), 0);
    const 总token = M.调用.reduce((a, b) => a + (b.tokens || 0), 0);
    const 采用 = M.采用.filter(x => x.动作 === "采用").length;
    const 修改 = M.采用.filter(x => x.动作 === "修改").length;
    const 删除 = M.采用.filter(x => x.动作 === "删除").length;
    const 忽略 = M.采用.filter(x => x.动作 === "忽略").length;
    const 处理总数 = 采用 + 修改 + 删除 + 忽略;
    return {
      调用数, 总秒, 总token,
      平均秒: 调用数 ? Math.round(总秒 / 调用数 * 10) / 10 : 0,
      // Moonshot 按 token 计价，这里按公开价粗算，只用于量级判断
      估算成本元: Math.round(总token / 1000 * 0.012 * 100) / 100,
      采用, 修改, 删除, 忽略, 处理总数,
      直接采用率: 处理总数 ? Math.round(采用 / 处理总数 * 100) : null,
      失败数: M.失败.length,
      降级数: M.降级.length,
      按步骤: (function () {
        const g = {};
        M.调用.forEach(c => {
          g[c.步骤] = g[c.步骤] || { 次数: 0, 秒: 0, tokens: 0 };
          g[c.步骤].次数++; g[c.步骤].秒 += c.秒 || 0; g[c.步骤].tokens += c.tokens || 0;
        });
        return g;
      })()
    };
  }

  load();
  return { record, adopt, fail, fallback, get, reset, summary };
})();

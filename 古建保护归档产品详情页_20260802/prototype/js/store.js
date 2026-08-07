/* 状态层：所有可变数据都在这里，视图只读它、只通过方法改它。
   订阅式更新：任何改动后 emit()，各视图重画。 */
window.Store = (function () {
  const LS = "gujian-wt-state";
  let subs = [];
  let S = null;

  function fresh() {
    return {
      当前步骤: "task",
      当前视图: "start",
      已进入项目: false,
      项目列表: JSON.parse(JSON.stringify(DATA.项目列表)),
      退回记录: [],
      主图: null,            // 用户上传照片后指向那张图
      构件来源: "演示预置",
      实测来源: "演示预置",
      选中构件: null,
      步骤状态: {            // idle 未开始 / running 进行中 / stop 等待人决定 / done 完成
        task: "idle", materials: "idle", datum: "idle", parts: "idle",
        condition: "idle", style: "idle", drawing: "idle", delivery: "idle"
      },
      解锁到: 0,             // 已解锁的步骤序号
      任务卡: JSON.parse(JSON.stringify(DATA.任务卡)),
      人员: JSON.parse(JSON.stringify(DATA.人员)),
      资料: JSON.parse(JSON.stringify(DATA.资料)),
      实测: JSON.parse(JSON.stringify(DATA.实测)),
      构件: JSON.parse(JSON.stringify(DATA.构件)),
      存疑: JSON.parse(JSON.stringify(DATA.存疑)),
      现状: JSON.parse(JSON.stringify(DATA.现状)),
      图纸样式: JSON.parse(JSON.stringify(DATA.图纸样式)),
      检查问题: JSON.parse(JSON.stringify(DATA.检查问题)),
      交付: JSON.parse(JSON.stringify(DATA.交付)),
      消息: [],
      修改记录: [],
      构件库: [],            // 已确认判断，识别时回传给模型复用
      排除记录: [],          // 人工判定不存在的误识别，识别时告知模型不再提出
      状态条: { 标题: "可以开始", 说明: "说明任务或选择一个项目", 类型: "idle" },
      引用: null,            // 当前框选引用 {构件, 框, 图}
      降级: false,           // 是否已选择无实测基准出草图
      真实调用: false
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(LS);
      S = raw ? JSON.parse(raw) : fresh();
    } catch (e) { S = fresh(); }
    if (!S || !S.步骤状态) S = fresh();
    // 旧版本存档没有这两个字段，补上
    if (!S.构件库) S.构件库 = [];
    if (!S.排除记录) S.排除记录 = [];
    // 旧存档沿用新版界面用语，避免刷新后继续出现“助手识别”等旧文字。
    if (S.状态条 && S.状态条.标题 === "工作助手") S.状态条.标题 = "可以开始";
    const 更新文字 = value => typeof value === "string"
      ? value.replaceAll("助手识别", "AI 识别")
        .replaceAll("人员确认", "人工确认")
        .replaceAll("采纳助手建议", "采纳 AI 建议")
      : value;
    (S.消息 || []).forEach(m => {
      m.text = 更新文字(m.text);
      if (m.card) {
        m.card.title = 更新文字(m.card.title);
        m.card.body = 更新文字(m.card.body);
        (m.card.options || []).forEach(o => {
          o.label = 更新文字(o.label);
          o.sub = 更新文字(o.sub);
        });
      }
    });
    // 旧版点击未开始步骤会反复写入提示，清理这些导航噪声并合并连续重复消息。
    const 导航提示 = /^「.+」还没有开始。这里先显示待处理内容，完成前一步后会自动更新。$/;
    const 整理后 = [];
    (S.消息 || []).forEach(m => {
      if (导航提示.test(m.text || "")) return;
      const 上条 = 整理后[整理后.length - 1];
      const 纯文本重复 = 上条 && 上条.who === m.who && 上条.text === m.text &&
        !上条.card && !m.card && !上条.process && !m.process && !上条.edits && !m.edits;
      if (!纯文本重复) 整理后.push(m);
    });
    S.消息 = 整理后.slice(-40);
    save();
  }
  function save() {
    try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {}
  }
  function reset() { S = fresh(); save(); emit(); }

  function get() { return S; }
  function sub(fn) { subs.push(fn); }

  /* 视图级订阅。视图会被反复创建，用全局 sub 会不断累积，
     切换十次就有十个回调在跑。这里单独存一份，切视图时清掉。 */
  let viewSubs = [];
  function subView(fn) { viewSubs.push(fn); }
  function clearViewSubs() { viewSubs = []; }

  function emit() {
    save();
    subs.forEach(f => { try { f(S); } catch (e) { console.error(e); } });
    viewSubs.forEach(f => { try { f(S); } catch (e) { console.error(e); } });
  }

  // ===== 消息 =====
  function say(who, text, extra) {
    const last = S.消息[S.消息.length - 1];
    if (!extra && last && last.who === who && last.text === text && Date.now() - last.t < 3000) {
      return last;
    }
    S.消息.push(Object.assign({ who, text, t: Date.now() }, extra || {}));
    emit();
    return S.消息[S.消息.length - 1];
  }
  function updateLast(patch) {
    const m = S.消息[S.消息.length - 1];
    if (m) Object.assign(m, patch);
    emit();
  }

  // ===== 状态条 =====
  function status(标题, 说明, 类型) {
    S.状态条 = { 标题, 说明: 说明 || "", 类型: 类型 || "idle" };
    emit();
  }

  // ===== 步骤 =====
  function stepIndex(id) { return DATA.步骤.findIndex(s => s.id === id); }
  function setStep(id, st) {
    S.步骤状态[id] = st;
    if (st === "done") {
      const i = stepIndex(id);
      if (i + 1 > S.解锁到) S.解锁到 = i + 1;
    }
    emit();
  }
  function goto(viewId) {
    if (S.当前视图 !== viewId) S.引用 = null;   // 框选的位置只在当前视图有效，切走就作废
    S.当前视图 = viewId;
    emit();
  }

  // ===== 构件操作 =====
  function findPart(no) { return S.构件.find(p => p.编号 === no); }
  function nextPartNo() {
    const nums = S.构件.map(p => parseInt(p.编号.replace(/\D/g, ""), 10)).filter(n => !isNaN(n));
    return "P" + String((nums.length ? Math.max.apply(null, nums) : 0) + 1).padStart(2, "0");
  }
  function addPart(p, 原因) {
    const 编号 = p.编号 || nextPartNo();
    const np = Object.assign({ 编号, 置信: "中", 状态: "human", 尺寸: "", 依据: "" }, p, { 编号 });
    S.构件.push(np);
    log("新增构件", 编号, 原因 || "人工补充");
    emit();
    return np;
  }
  function editPart(no, patch, 原因) {
    const p = findPart(no);
    if (!p) return null;
    const before = JSON.stringify({ 名称: p.名称, 类别: p.类别, 框: p.框 });
    const 原来是AI = p.状态 === "ai" || p.状态 === "demo";
    Object.assign(p, patch);
    p.状态 = patch.状态 || "human";
    log("修改构件", no, (原因 || "人工修正") + "；原值 " + before);
    // AI 给的结果被人改了，记一笔，用于算直接采用率
    if (原来是AI && window.Metrics && !/采纳 AI 建议/.test(原因 || "")) Metrics.adopt(no, "修改");
    emit();
    return p;
  }
  function removePart(no, 原因) {
    const i = S.构件.findIndex(p => p.编号 === no);
    if (i < 0) return;
    const p = S.构件[i];
    S.构件.splice(i, 1);
    // 界面上说"记入排除记录"，这里就要真的记，识别时会回传给模型
    S.排除记录.push({ 编号: no, 名称: p.名称, 类别: p.类别,
      原因: 原因 || "人工判定不存在",
      时间: new Date().toLocaleString("zh-CN", { hour12: false }) });
    log("删除构件", no, (原因 || "人工判定不存在") + "；原名称 " + p.名称);
    if ((p.状态 === "ai" || p.状态 === "demo") && window.Metrics) Metrics.adopt(no, "删除");
    if (S.选中构件 === no) S.选中构件 = null;
    emit();
  }
  function selectPart(no) { S.选中构件 = no; emit(); }

  // ===== 存疑处理 =====
  function resolveQuestion(id, 结论, 理由, 人) {
    const q = S.存疑.find(x => x.id === id);
    if (!q) return;
    q.结论 = 结论; q.理由 = 理由; q.处理人 = 人 || "李工"; q.已解决 = true;
    if (q.构件) {
      const p = findPart(q.构件);
      if (p) { p.状态 = "human"; p.置信 = "高"; p.人工结论 = 结论; }
    }
    log("处理存疑", q.构件 || q.id, q.标题 + " 判定为：" + 结论 + "；理由：" + 理由);
    emit();
  }
  function toLibrary(item) {
    S.构件库.push(Object.assign({ 时间: new Date().toISOString().slice(0, 10) }, item));
    emit();
  }

  // ===== 修改记录 =====
  function log(动作, 对象, 说明) {
    S.修改记录.push({
      动作, 对象, 说明,
      人: "李工",
      时间: new Date().toLocaleString("zh-CN", { hour12: false })
    });
  }

  // ===== 引用（框选） =====
  function setRef(ref) { S.引用 = ref; emit(); }
  function clearRef() { S.引用 = null; emit(); }

  load();
  return {
    get, sub, subView, clearViewSubs, emit, reset, save,
    say, updateLast, status,
    setStep, goto, stepIndex,
    findPart, addPart, editPart, removePart, selectPart, nextPartNo,
    resolveQuestion, toLibrary, log,
    setRef, clearRef
  };
})();

/* 视图：整理资料。左边资料清单与缺口，右边选中资料的原图。 */
window.ViewMaterials = function (root) {
  const S = Store.get();
  const data = UI.el("div", "pane-data");
  // paint 只重写 body，操作条挂在 data 上，否则点一下列表按钮就没了
  const body = UI.el("div", "pane-body");
  data.appendChild(body);
  const evi = UI.el("div", "pane-evi");

  let cur = S.资料.find(m => m.id === (S.选中资料 || "m1")) || S.资料[0];

  function rows() {
    return S.资料.map(m => {
      const bad = !m.可用;
      return '<tr class="row' + (bad ? " flag" : "") + (m.id === cur.id ? " sel" : "") + '" data-id="' + m.id + '">' +
        "<td>" + UI.esc(m.类型) + "</td>" +
        "<td>" + UI.esc(m.名称) + "<div class=\"hint\">" + UI.esc(m.说明) + "</div></td>" +
        "<td>" + UI.esc(m.用途) + "</td>" +
        "<td>" + (bad ? UI.stateBadge("缺") : UI.stateBadge(m.状态)) + "</td></tr>";
    }).join("");
  }

  function paint() {
    body.innerHTML =
      '<div class="pane-title"><span>资料核对</span><span class="hint">共 ' + S.资料.length + " 份</span></div>" +
      '<div class="card">' + UI.table(["类型", "名称", "用途", "状态"], [rows()]) + "</div>" +
      '<div class="card"><div class="card-title">资料是否够用</div>' +
      '<div class="hint" style="line-height:1.9">' +
      "正立面全景可用，主图建议使用第 1 张，遮挡最少。<br>" +
      "右次间下部被树木遮挡，两张照片同一位置均无法确认，需补拍或在图上标注为不可见部位。<br>" +
      "<b>缺少实测尺寸记录。</b>没有实测基准，全部尺寸只能按照片比例估算，不能作为正式测绘成果。" +
      "</div></div>";

    body.querySelectorAll("tr.row").forEach(tr => {
      tr.onclick = () => {
        cur = S.资料.find(m => m.id === tr.dataset.id);
        S.选中资料 = cur.id;
        paint(); paintEvi();
      };
    });
  }

  function paintEvi() {
    if (cur.类型 === "照片") {
      Evidence.mount(evi, "assets/" + cur.文件, { draw: false });
    } else {
      evi.innerHTML = '<div class="evi-tools">' + UI.esc(cur.名称) + "</div>" +
        '<div style="flex:1;display:flex;align-items:center;justify-content:center;color:var(--ink-3);font-size:12.5px;text-align:center;padding:30px">' +
        (cur.可用
          ? UI.esc(cur.文件 || cur.名称) + "<br><span class=\"hint\">" + UI.esc(cur.说明) + "</span>"
          : "这份资料不存在<br><span class=\"hint\">" + UI.esc(cur.说明) + "</span>") +
        "</div>";
    }
  }

  root.appendChild(data);
  root.appendChild(evi);
  paint();
  paintEvi();

  UI.actionBar(data, [
    { label: "资料已核对，检查实测尺寸", primary: true,
      onClick: () => { Store.setStep("materials", "done"); Store.goto("datum"); } },
    { label: "标记需要补拍", onClick: () => {
        Store.log("补采清单", "右次间下部", "树木遮挡，需补拍");
        Store.say("ai", "已把右次间下部记入补拍清单。这部分在图上会标为不可见部位，等补拍后再更新。");
      } },
    { label: "回任务要求", onClick: () => Store.goto("task") }
  ], "缺少的资料会在图上标为不可见部位，也可以先安排补拍。");
};

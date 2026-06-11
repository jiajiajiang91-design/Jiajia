/* MemoryOS interactive specimen — behaviour. Scoped per .mosx root. */
(function(){
  function initRoot(root){
    if(root.dataset.mosxInit) return;
    root.dataset.mosxInit = "1";

    function lang(){ return document.body.getAttribute("data-lang")==="cn" ? "cn" : "en"; }
    var T = {
      cn:{ start:"已复制开始对话指令。粘贴到 AI，让它读取记忆卡片。",
           end:"已复制结束对话指令。粘贴到 AI，让它整理总结和卡片新版。",
           import:"粘贴 AI 输出的总结，更新记忆卡片。",
           saved:"已保存。更新了 {n} 项。",
           nothing:"没有勾选任何项。",
           discarded:"已丢弃这份待审更新。" },
      en:{ start:"Start prompt copied. Paste it into your AI to load the memory cards.",
           end:"End prompt copied. Paste it into your AI to draft the summary and updated cards.",
           import:"Paste the AI's summary to update the memory cards.",
           saved:"Saved. {n} item(s) updated.",
           nothing:"Nothing selected.",
           discarded:"Pending update discarded." }
    };

    /* ── reveal on enter ── */
    if("IntersectionObserver" in window){
      var io = new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ root.classList.add("is-in"); io.disconnect(); } });
      },{threshold:.12});
      io.observe(root);
    } else { root.classList.add("is-in"); }

    /* ── view switch ── */
    function showView(v){
      root.querySelectorAll(".mosx-tab").forEach(function(b){
        b.setAttribute("aria-selected", b.getAttribute("data-view")===v ? "true":"false");
      });
      root.querySelectorAll(".mosx-screen").forEach(function(s){
        s.classList.toggle("is-active", s.getAttribute("data-screen")===v);
      });
      root.querySelectorAll(".mosx-cap").forEach(function(c){
        c.classList.toggle("is-on", c.getAttribute("data-cap")===v);
      });
    }
    root.querySelectorAll(".mosx-tab").forEach(function(b){
      b.addEventListener("click",function(){ showView(b.getAttribute("data-view")); });
    });

    /* ── toast ── */
    var toastEl = root.querySelector("[data-toast]");
    var toastTx = root.querySelector("[data-toasttext]");
    var toastTimer;
    function toast(msg){
      if(!toastEl) return;
      toastTx.textContent = msg;
      toastEl.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function(){ toastEl.classList.remove("show"); }, 2600);
    }

    /* ── modal: 复制结束对话指令 → 弹窗（忠实真实 app；CopyPromptModal）── */
    var modal = root.querySelector("[data-modal]");
    function openModal(){ if(modal) modal.classList.add("open"); }
    function closeModal(){ if(modal) modal.classList.remove("open"); }
    if(modal){
      root.querySelectorAll("[data-modal-close]").forEach(function(b){ b.addEventListener("click",closeModal); });
      modal.addEventListener("click",function(e){ if(e.target===modal) closeModal(); });
      modal.querySelectorAll("[data-mcheck]").forEach(function(c){ c.addEventListener("click",function(){ c.classList.toggle("on"); }); });
      modal.querySelectorAll(".mm-chip").forEach(function(ch){ ch.addEventListener("click",function(){
        modal.querySelectorAll(".mm-chip").forEach(function(x){ x.classList.remove("is-on"); });
        ch.classList.add("is-on");
      }); });
      var pvBtn = modal.querySelector("[data-preview-toggle]"), pv = modal.querySelector("[data-preview]");
      if(pvBtn && pv) pvBtn.addEventListener("click",function(){ pvBtn.classList.toggle("open"); pv.classList.toggle("open"); });
      var mCopy = modal.querySelector("[data-modal-copy]");
      if(mCopy) mCopy.addEventListener("click",function(){ closeModal(); toast(T[lang()].end); });
    }

    /* ── copy buttons ── */
    root.querySelectorAll("[data-copy]").forEach(function(btn){
      btn.addEventListener("click",function(){
        var kind = btn.getAttribute("data-copy");
        if(kind==="end"){ openModal(); return; }   // 真实行为：结束指令打开弹窗，不是直接复制
        toast(T[lang()][kind]);
        if(kind==="start"){
          btn.classList.add("is-copied");
          setTimeout(function(){ btn.classList.remove("is-copied"); }, 1300);
        }
      });
    });

    /* ── pending badge → review ; help → connect ── */
    var goReview = root.querySelector("[data-gotoreview]");
    if(goReview) goReview.addEventListener("click",function(){ showView("review"); });
    root.querySelectorAll("[data-help]").forEach(function(h){
      h.addEventListener("click",function(){ showView("connect"); });
    });

    /* ── review: checkboxes + count ── */
    function refreshCount(){
      var n = root.querySelectorAll(".mosx-check.on").length;
      root.querySelectorAll("[data-selcount]").forEach(function(el){ el.textContent = n; });
    }
    root.querySelectorAll("[data-check]").forEach(function(c){
      c.addEventListener("click",function(){ c.classList.toggle("on"); refreshCount(); });
    });

    /* ── review: save / discard ── */
    var saveBtn = root.querySelector("[data-save]");
    if(saveBtn) saveBtn.addEventListener("click",function(){
      var n = root.querySelectorAll(".mosx-check.on").length;
      if(n===0){ toast(T[lang()].nothing); return; }
      toast(T[lang()].saved.replace("{n}", n));
    });
    var discardBtn = root.querySelector("[data-discard]");
    if(discardBtn) discardBtn.addEventListener("click",function(){
      var sugs = root.querySelectorAll('.mosx-screen[data-screen="review"] .mosx-sug');
      sugs.forEach(function(s){ s.classList.add("is-discarded"); });
      toast(T[lang()].discarded);
      setTimeout(function(){
        sugs.forEach(function(s){ s.classList.remove("is-discarded"); });
        root.querySelectorAll(".mosx-check").forEach(function(c,i){ c.classList.toggle("on", i===0); });
        refreshCount();
      }, 1400);
    });

    /* ── standalone language toggle (absent when embedded) ── */
    root.querySelectorAll("[data-setlang]").forEach(function(b){
      b.addEventListener("click",function(){
        var l = b.getAttribute("data-setlang");
        document.body.setAttribute("data-lang", l);
        root.querySelectorAll("[data-setlang]").forEach(function(x){
          x.setAttribute("aria-pressed", x.getAttribute("data-setlang")===l ? "true":"false");
        });
      });
    });
  }

  function init(){ document.querySelectorAll(".mosx").forEach(initRoot); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

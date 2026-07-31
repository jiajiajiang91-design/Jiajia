const tabs = [...document.querySelectorAll("[data-demo-tab]")];
const states = [...document.querySelectorAll("[data-demo-state]")];
const stateNames = new Set(states.map((node) => node.dataset.demoState));

function showDemoState(name, moveFocus = false) {
  if (!stateNames.has(name)) return;

  tabs.forEach((tab) => {
    const active = tab.dataset.demoTab === name;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && moveFocus) tab.focus();
  });

  states.forEach((state) => {
    const active = state.dataset.demoState === name;
    state.classList.toggle("is-active", active);
    state.hidden = !active;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => showDemoState(tab.dataset.demoTab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    showDemoState(tabs[nextIndex].dataset.demoTab, true);
  });
});

document.querySelectorAll("[data-demo-go]").forEach((button) => {
  button.addEventListener("click", () => showDemoState(button.dataset.demoGo, true));
});

function scalePrototype(viewport) {
  const canvas = viewport.querySelector("[data-scale-canvas]");
  if (!canvas) return;
  const scale = Math.min(1, viewport.clientWidth / 1248);
  canvas.style.transform = `scale(${scale})`;
  viewport.style.height = `${780 * scale}px`;
}

const prototypeViewports = [...document.querySelectorAll("[data-scale-viewport]")];
const resizeObserver = "ResizeObserver" in window
  ? new ResizeObserver((entries) => entries.forEach((entry) => scalePrototype(entry.target)))
  : null;

prototypeViewports.forEach((viewport) => {
  scalePrototype(viewport);
  resizeObserver?.observe(viewport);
});

window.addEventListener("resize", () => {
  if (!resizeObserver) prototypeViewports.forEach(scalePrototype);
});

showDemoState("sort");

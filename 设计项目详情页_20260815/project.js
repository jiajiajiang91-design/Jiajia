const PROJECTS = [
  {
    id: "remediscape",
    code: "MArch · 01",
    year: "2025—2026",
    loc: "伦敦 · 英国",
    zh: "RemediScape",
    en: "A Multi-Scalar Design Intelligence Framework · Dagenham Dock, East London",
    desc: "项目以伦敦 Dagenham 电站旧址约 38.6 公顷场地为对象，通过 ArcGIS 多尺度分析及历史地图、地质与填埋记录构建污染概念模型，制定修复分区、总平面与 30 年分期策略，并结合植物修复、菌丝床、湿地缓冲带及点云数字孪生呈现场地更新过程。",
    pages: 72,
    pdf: "../assets/documents/RemediScape-drawings.pdf?v=20260815-03",
  },
  {
    id: "neighbors-no-boundaries",
    code: "UG · 01",
    year: "2023",
    loc: "深圳 · 中国",
    zh: "邻里无界",
    en: "Neighbors But No Boundaries",
    desc: "项目以深圳南头古城为背景，在历史延续与高密度当代生活之间寻找平衡。通过改善基础设施并重新组织共享空间，为居民和访客建立更开放、更具互动性的生活网络。",
    pages: 6,
  },
  {
    id: "liquid-legacy",
    code: "UG · 02",
    year: "2024—2025",
    loc: "上海 · 中国",
    zh: "流动遗产",
    en: "Liquid Legacy",
    desc: "项目将历史悠久的中华造船厂转化为污水修复公园。工业遗迹、湿地系统和公共路径共同讲述水体从污染走向更新的过程，同时保留场地原有的工业身份。",
    pages: 6,
  },
  {
    id: "living-with-rainforest",
    code: "UG · 03",
    year: "2024",
    loc: "马托格罗索 · 巴西",
    zh: "与雨林共生",
    en: "Living With The Rainforest",
    desc: "面对大豆种植扩张与亚马逊雨林退化，项目以土地适宜性分区、生态廊道和多样化土地利用建立区域修复策略，将农业生产与雨林保护视为同一个相互关联的系统。",
    pages: 5,
  },
  {
    id: "playcube",
    code: "UG · 04",
    year: "2022—2023",
    loc: "新泽西 · 美国",
    zh: "玩乐方块",
    en: "PlayCube",
    desc: "项目通过攀爬、聚集和感官体验空间，鼓励不同文化背景的儿童协作与交流，让基础设施成为兼顾年龄、能力与安全需求的包容性游乐框架。",
    pages: 6,
  },
  {
    id: "revival-paradise",
    code: "UG · 05",
    year: "2022",
    loc: "休斯敦 · 美国",
    zh: "复兴乐园",
    en: "Revival Paradise",
    desc: "这是一个服务居民与流浪犬的社区景观，将动物福利、生态修复和垃圾系统改造结合起来，以多层路径、共享照护空间和循环物质流支持更安全的社区生态。",
    pages: 6,
  },
  {
    id: "dubai-collage-city",
    code: "PRO · 01",
    year: "2025",
    loc: "迪拜 · 阿联酋",
    zh: "迪拜拼贴城市",
    en: "Dubai-Collage City",
    desc: "项目以“文化皮肤”为更新策略，通过遮阳、铺装、标识和街道家具等可复制的小尺度介入，为历史、居住、生态和混合功能片区建立灵活统一的公共空间语言。",
    pages: 5,
  },
  {
    id: "walk-by-water",
    code: "UG · 07",
    year: "2021—2022",
    loc: "穆伊纳克 · 乌兹别克斯坦",
    zh: "逐水而行",
    en: "Walk By Water",
    desc: "项目为曾经的咸海渔业中心建立恢复框架，通过防护林、集水系统、滴灌、轮作与小型市场构筑物，将生态修复重新连接到当地居民的生计。",
    pages: 5,
  },
];

const ASSET_DIR = "../assets/images/home/design-portfolio";

const params = new URLSearchParams(window.location.search);
const requestedId = params.get("id");
const index = Math.max(0, PROJECTS.findIndex((p) => p.id === requestedId));
const project = PROJECTS[index];

const pageSrc = (n) => `${ASSET_DIR}/${project.id}-page-${String(n).padStart(2, "0")}.webp`;

document.title = `${project.zh}｜设计项目｜江佳佳作品集`;
document.querySelector("#p-code").textContent = project.code;
document.querySelector("#p-year").textContent = project.year;
document.querySelector("#p-loc").textContent = project.loc;
document.querySelector("#p-title").textContent = project.zh;
document.querySelector("#p-subtitle").textContent = project.en;
document.querySelector("#p-desc").textContent = project.desc;

const pdfLink = document.querySelector("#p-pdf");
if (project.pdf) {
  pdfLink.href = project.pdf;
  pdfLink.hidden = false;
}

// 上一个 / 下一个项目
const prevProject = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
const nextProject = PROJECTS[(index + 1) % PROJECTS.length];
const navPrev = document.querySelector("#p-nav-prev");
const navNext = document.querySelector("#p-nav-next");
navPrev.href = `index.html?id=${prevProject.id}`;
navPrev.querySelector("span").textContent = prevProject.zh;
navNext.href = `index.html?id=${nextProject.id}`;
navNext.querySelector("span").textContent = nextProject.zh;

// 箭头图片框
let current = 1;
const viewerImage = document.querySelector("#p-image");
const viewerCount = document.querySelector("#p-count");
const btnPrev = document.querySelector("#p-prev");
const btnNext = document.querySelector("#p-next");

function preload(n) {
  if (n < 1 || n > project.pages) return;
  const img = new Image();
  img.src = pageSrc(n);
}

function renderViewer() {
  viewerImage.src = pageSrc(current);
  viewerImage.alt = `${project.zh}项目图纸，第 ${current} 页，共 ${project.pages} 页`;
  viewerCount.textContent = `${current} / ${project.pages}`;
  btnPrev.disabled = current === 1;
  btnNext.disabled = current === project.pages;
  preload(current + 1);
  preload(current - 1);
}

btnPrev.addEventListener("click", () => { if (current > 1) { current -= 1; renderViewer(); } });
btnNext.addEventListener("click", () => { if (current < project.pages) { current += 1; renderViewer(); } });
document.addEventListener("keydown", (event) => {
  const lightbox = document.querySelector("#practice-lightbox");
  if (lightbox && lightbox.open) return;
  if (event.key === "ArrowLeft") btnPrev.click();
  if (event.key === "ArrowRight") btnNext.click();
});
renderViewer();

// 点击图片放大（复用主站图纸浏览器样式）
const lightbox = document.querySelector("#practice-lightbox");
if (lightbox && typeof lightbox.showModal === "function") {
  const lbTitle = lightbox.querySelector("#practice-lightbox-title");
  const lbCount = lightbox.querySelector(".practice-lightbox-count");
  const lbImage = lightbox.querySelector(".practice-lightbox-image");
  const lbZoom = lightbox.querySelector(".practice-lightbox-zoom");
  const lbPrev = lightbox.querySelector(".practice-lightbox-prev");
  const lbNext = lightbox.querySelector(".practice-lightbox-next");
  const lbClose = lightbox.querySelector(".practice-lightbox-close");

  function resetZoom() {
    lbZoom.setAttribute("aria-pressed", "false");
    lightbox.querySelector(".practice-lightbox-stage").scrollTo(0, 0);
  }

  function renderLightbox() {
    lbTitle.textContent = project.zh;
    lbCount.textContent = `${current} / ${project.pages}`;
    lbImage.src = pageSrc(current);
    lbImage.alt = `${project.zh}项目图纸放大，第 ${current} 页`;
    lbPrev.disabled = current === 1;
    lbNext.disabled = current === project.pages;
    resetZoom();
  }

  viewerImage.addEventListener("click", () => {
    renderLightbox();
    lightbox.showModal();
    document.body.classList.add("lightbox-open");
    lbClose.focus();
  });

  lbPrev.addEventListener("click", () => { if (current > 1) { current -= 1; renderLightbox(); renderViewer(); } });
  lbNext.addEventListener("click", () => { if (current < project.pages) { current += 1; renderLightbox(); renderViewer(); } });
  lbZoom.addEventListener("click", () => {
    lbZoom.setAttribute("aria-pressed", lbZoom.getAttribute("aria-pressed") !== "true" ? "true" : "false");
  });
  lbClose.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") lbPrev.click();
    if (event.key === "ArrowRight") lbNext.click();
  });
  lightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    resetZoom();
  });
}

// 移动端菜单
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// 页头滚动状态
const header = document.querySelector("[data-header]");
function updateHeader() {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

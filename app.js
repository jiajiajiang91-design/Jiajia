document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
}

const socialToggle = document.querySelector(".social-toggle");
const socialMore = document.querySelector("#social-more");

if (socialToggle && socialMore) {
  const socialToggleLabel = socialToggle.querySelector(".social-toggle-label");
  socialMore.hidden = true;
  socialToggle.hidden = false;

  socialToggle.addEventListener("click", () => {
    const willExpand = socialToggle.getAttribute("aria-expanded") !== "true";
    socialToggle.setAttribute("aria-expanded", String(willExpand));
    socialMore.hidden = !willExpand;
    if (socialToggleLabel) {
      socialToggleLabel.textContent = willExpand ? "收起更多内容" : "展开更多内容";
    }
  });
}

const practiceGalleries = {
  latent: {
    title: "Latent Walk：探索材料变化路径",
    images: [
      "assets/images/home/ai-practice/latent-walk-01.webp",
      "assets/images/home/ai-practice/latent-walk-02.webp",
    ],
  },
  nca: {
    title: "NCA：模拟空间策略演化",
    images: [
      "assets/images/home/ai-practice/nca-01.webp",
      "assets/images/home/ai-practice/nca-02.webp",
      "assets/images/home/ai-practice/nca-03.webp",
      "assets/images/home/ai-practice/nca-04.webp",
    ],
  },
};

const practiceLightbox = document.querySelector("#practice-lightbox");

if (practiceLightbox && typeof practiceLightbox.showModal === "function") {
  const lightboxTitle = practiceLightbox.querySelector("#practice-lightbox-title");
  const lightboxCount = practiceLightbox.querySelector(".practice-lightbox-count");
  const lightboxImage = practiceLightbox.querySelector(".practice-lightbox-image");
  const lightboxZoom = practiceLightbox.querySelector(".practice-lightbox-zoom");
  const lightboxPrev = practiceLightbox.querySelector(".practice-lightbox-prev");
  const lightboxNext = practiceLightbox.querySelector(".practice-lightbox-next");
  const lightboxClose = practiceLightbox.querySelector(".practice-lightbox-close");
  let activeGallery = null;
  let activeIndex = 0;
  let lastTrigger = null;

  function resetLightboxZoom() {
    lightboxZoom.setAttribute("aria-pressed", "false");
    lightboxZoom.setAttribute("aria-label", "放大当前图纸");
    practiceLightbox.querySelector(".practice-lightbox-stage").scrollTo(0, 0);
  }

  function renderPracticeImage() {
    if (!activeGallery) return;
    const total = activeGallery.images.length;
    lightboxTitle.textContent = activeGallery.title;
    lightboxCount.textContent = `${activeIndex + 1} / ${total}`;
    lightboxImage.src = activeGallery.images[activeIndex];
    lightboxImage.alt = `${activeGallery.title}项目图纸，第 ${activeIndex + 1} 页，共 ${total} 页`;
    lightboxPrev.disabled = activeIndex === 0;
    lightboxNext.disabled = activeIndex === total - 1;
    resetLightboxZoom();
  }

  document.querySelectorAll("[data-gallery]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      activeGallery = practiceGalleries[trigger.dataset.gallery];
      if (!activeGallery) return;
      activeIndex = 0;
      lastTrigger = trigger;
      renderPracticeImage();
      practiceLightbox.showModal();
      document.body.classList.add("lightbox-open");
      lightboxClose.focus();
    });
  });

  lightboxPrev.addEventListener("click", () => {
    if (activeIndex <= 0) return;
    activeIndex -= 1;
    renderPracticeImage();
  });

  lightboxNext.addEventListener("click", () => {
    if (!activeGallery || activeIndex >= activeGallery.images.length - 1) return;
    activeIndex += 1;
    renderPracticeImage();
  });

  lightboxZoom.addEventListener("click", () => {
    const willZoom = lightboxZoom.getAttribute("aria-pressed") !== "true";
    lightboxZoom.setAttribute("aria-pressed", String(willZoom));
    lightboxZoom.setAttribute("aria-label", willZoom ? "缩小当前图纸" : "放大当前图纸");
  });

  lightboxClose.addEventListener("click", () => practiceLightbox.close());
  practiceLightbox.addEventListener("click", (event) => {
    if (event.target === practiceLightbox) practiceLightbox.close();
  });
  practiceLightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") lightboxPrev.click();
    if (event.key === "ArrowRight") lightboxNext.click();
  });
  practiceLightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    resetLightboxZoom();
    if (lastTrigger) lastTrigger.focus();
  });
}

const recommendationDialog = document.querySelector("#recommendation-dialog");
const recommendationTrigger = document.querySelector(".timeline-letter-button");

if (recommendationDialog && recommendationTrigger && typeof recommendationDialog.showModal === "function") {
  const recommendationClose = recommendationDialog.querySelector(".recommendation-dialog-close");

  recommendationTrigger.addEventListener("click", () => {
    recommendationDialog.showModal();
    document.body.classList.add("lightbox-open");
    recommendationClose.focus();
  });

  recommendationClose.addEventListener("click", () => recommendationDialog.close());
  recommendationDialog.addEventListener("click", (event) => {
    if (event.target === recommendationDialog) recommendationDialog.close();
  });
  recommendationDialog.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    recommendationTrigger.focus();
  });
}

const revealItems = [...document.querySelectorAll(".reveal")];
revealItems.forEach((item, index) => {
  item.style.setProperty("--reveal-order", String(index % 4));
});

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.13, rootMargin: "0px 0px -8%" },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

const sectionLinks = [...document.querySelectorAll(".nav-links a[href^='#']")];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      sectionLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current.target.id}`);
      });
    },
    { rootMargin: "-25% 0px -60%", threshold: [0, 0.2, 0.6] },
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("load", () => document.body.classList.add("page-ready"), { once: true });

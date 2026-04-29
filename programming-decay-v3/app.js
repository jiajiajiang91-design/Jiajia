const layerDefinitions = [
  { id: "brownfield", label: "Brownfield density", short: "Brownfield", color: "#ff48a8", weight: 0.18 },
  { id: "building", label: "Building coverage", short: "Building", color: "#be65df", weight: 0.12 },
  { id: "waste", label: "Waste infrastructure", short: "Waste", color: "#67a8ff", weight: 0.2 },
  { id: "flood", label: "Flood risk exposure", short: "Flood", color: "#00e6d2", weight: 0.24 },
  { id: "population", label: "Population density", short: "Population", color: "#32caff", weight: 0.16 },
  { id: "ecology", label: "Ecological sensitivity", short: "Ecology", color: "#5d72ff", weight: 0.1 },
];

const sites = [
  {
    id: "27",
    label: "Site 27",
    score: 84,
    x: "5.4%",
    y: "14.8%",
    copy: "Low brownfield count, high flood exposure, and dense population keep this cell in the first cluster.",
    features: { brownfield: 0, building: 76, waste: 73, flood: 75, population: 100, ecology: 0 },
  },
  {
    id: "28",
    label: "Site 28",
    score: 78,
    x: "19.1%",
    y: "14.8%",
    copy: "A balanced risk signature where building coverage and flood exposure become the main intervention drivers.",
    features: { brownfield: 0, building: 59, waste: 27, flood: 76, population: 55, ecology: 0 },
  },
  {
    id: "29",
    label: "Site 29",
    score: 73,
    x: "32.8%",
    y: "14.8%",
    copy: "Waste infrastructure and flood exposure concentrate risk while population pressure remains moderate.",
    features: { brownfield: 0, building: 38, waste: 55, flood: 78, population: 49, ecology: 0 },
  },
  {
    id: "30",
    label: "Site 30",
    score: 81,
    x: "46.4%",
    y: "14.8%",
    copy: "A high water-risk cell with enough population density to justify early monitoring and field sampling.",
    features: { brownfield: 0, building: 43, waste: 45, flood: 81, population: 80, ecology: 0 },
  },
  {
    id: "37",
    label: "Site 37",
    score: 88,
    x: "60.1%",
    y: "14.8%",
    copy: "Brownfield concentration and building coverage create a strong case for reuse and decay programming.",
    features: { brownfield: 84, building: 74, waste: 36, flood: 65, population: 72, ecology: 0 },
  },
  {
    id: "38",
    label: "Site 38",
    score: 92,
    x: "73.5%",
    y: "14.8%",
    copy: "The strongest product candidate: waste infrastructure and flood exposure align with an architectural Hub deployment.",
    features: { brownfield: 27, building: 53, waste: 100, flood: 100, population: 45, ecology: 0 },
  },
  {
    id: "23",
    label: "Site 23",
    score: 86,
    x: "87.0%",
    y: "14.8%",
    copy: "A low-coverage but high-flood cell, suited to monitoring, field probes, and long-cycle ecological remediation.",
    features: { brownfield: 0, building: 20, waste: 82, flood: 86, population: 15, ecology: 0 },
  },
];

const strategies = [
  {
    id: "decay",
    name: "Decay",
    color: "#00e6d2",
    area: "19.6%",
    time: "5-20 years",
    physical: "Mycological field",
    digital: "Decay-tracking dashboard",
    role: "Long-cycle remediation of contaminated ground through biological sensing, decay metrics, and material transformation.",
  },
  {
    id: "reuse",
    name: "Reuse",
    color: "#67a8ff",
    area: "65.4%",
    time: "1-3 years",
    physical: "Adapted warehouse / Hub",
    digital: "Metaverse portal",
    role: "Short-cycle activation of existing industrial fabric as public interface, research space, and decision-control layer.",
  },
  {
    id: "rewild",
    name: "Rewild",
    color: "#be65df",
    area: "15.0%",
    time: "3-10 years",
    physical: "Riverfront wetland",
    digital: "Biodiversity commons",
    role: "Ecological buffer that turns riverfront risk into habitat, observation, and public environmental literacy.",
  },
  {
    id: "dismantle",
    name: "Dismantle",
    color: "#8c78ff",
    area: "7.46%",
    time: "6-12 months",
    physical: "Material recovery yard",
    digital: "AI material registry",
    role: "Fast material sorting and recovery system that turns demolition waste into tracked feedstock for future reuse.",
  },
];

const mlStages = [
  {
    label: "Stage 01",
    title: "Spatial input labels",
    description: "GIS and architectural labels form the seed condition: site outline, strategy regions, and hard boundaries.",
  },
  {
    label: "Stage 02",
    title: "Pix2Pix translation",
    description: "The image-to-image step proposes a legible strategy field from territorial and building-pattern inputs.",
  },
  {
    label: "Stage 03",
    title: "Cellular automata propagation",
    description: "The generated field is stabilized into strategy zones with noise, boundaries, and persistence made visible.",
  },
  {
    label: "Stage 04",
    title: "Cluster boundary repair",
    description: "K-Means regions become clean deployment zones while retaining the gradients that matter for design judgment.",
  },
  {
    label: "Stage 05",
    title: "Product decision readout",
    description: "The simulation resolves into area shares, strategy confidence, and a package of recommended interventions.",
  },
];

const hubViews = [
  {
    id: "site",
    label: "Site plan",
    image: "./assets/pdf/site-plan.png",
    title: "Site Strategy: Hub and Field Network",
    copy: "The product starts with a site plan that connects remediation plots, sensing nodes, circulation, and the four-tower Hub.",
    monitoring: false,
  },
  {
    id: "axon",
    label: "Axonometric",
    image: "./assets/pdf/axonometric.png",
    title: "Hub Cluster Axonometric",
    copy: "Four towers are treated as modules: research, public interface, archive, and observatory, tied by public and staff bridges.",
    monitoring: false,
  },
  {
    id: "section",
    label: "Section",
    image: "./assets/pdf/section-perspective.png",
    title: "Section-Perspective: Tower B x Tower A",
    copy: "The section explains how public openness, research density, pilotis ground release, and separated circulation work across the tower cluster.",
    monitoring: false,
  },
  {
    id: "field",
    label: "Field view",
    image: "./assets/pdf/hub-field.png",
    title: "The Hub in the Field",
    copy: "The building lands inside the post-industrial fabric while releasing ground for remediation and public observation.",
    monitoring: false,
  },
  {
    id: "bridge",
    label: "Sky bridge",
    image: "./assets/pdf/skybridge.png",
    title: "Public and Staff Circulation",
    copy: "Separated bridges create two loops: a public learning route and a research route across the remediation void.",
    monitoring: false,
  },
  {
    id: "aerial",
    label: "Aerial view",
    image: "./assets/pdf/aerial-view.png",
    title: "Aerial View: Situated Hub",
    copy: "The aerial view shows the four-tower Hub landing inside the post-industrial fabric and connecting back to Dagenham Dock's field network.",
    monitoring: false,
  },
  {
    id: "sequence",
    label: "Viewpoints",
    image: "./assets/pdf/hub-sequence.png",
    title: "Three Viewpoint Sequence",
    copy: "Approach, processing court, and upper bridge views turn the architecture into a staged product walkthrough.",
    monitoring: false,
  },
  {
    id: "monitoring",
    label: "Monitoring",
    image: "./assets/pdf/monitoring.png",
    title: "Real-time Monitoring Feedback",
    copy: "Drones, facade sensors, and NCA progress indicators feed the Hub dashboard and update the territorial model.",
    monitoring: true,
  },
];

const activeLayers = new Set(layerDefinitions.map((layer) => layer.id));
let activeSite = sites.find((site) => site.id === "38") || sites[0];
let activeStrategy = strategies[0];
let activeHubView = hubViews[0];
let animationTimer = undefined;

function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

function renderLayerControls() {
  const container = qs("#layer-controls");
  const chart = qs("#layer-chart");
  container.innerHTML = "";
  chart.innerHTML = "";

  layerDefinitions.forEach((layer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "layer-button";
    button.dataset.layer = layer.id;
    button.setAttribute("aria-pressed", "true");
    button.style.setProperty("--layer-color", layer.color);
    button.innerHTML = `
      <span class="swatch" aria-hidden="true"></span>
      <span>${layer.label}</span>
      <span class="layer-weight">${Math.round(layer.weight * 100)}%</span>
    `;
    button.addEventListener("click", () => {
      if (activeLayers.has(layer.id)) {
        activeLayers.delete(layer.id);
      } else {
        activeLayers.add(layer.id);
      }
      updateAtlas();
    });
    container.appendChild(button);

    const row = document.createElement("div");
    row.className = "chart-row";
    row.dataset.layerRow = layer.id;
    row.style.setProperty("--row-color", layer.color);
    row.innerHTML = `
      <span>${layer.short}</span>
      <span class="chart-track"><span class="chart-fill"></span></span>
      <span>${Math.round(layer.weight * 100)}%</span>
    `;
    chart.appendChild(row);
  });
}

function weightedRiskFor(site) {
  let numerator = 0;
  let denominator = 0;
  layerDefinitions.forEach((layer) => {
    if (!activeLayers.has(layer.id)) return;
    numerator += (site.features[layer.id] || 0) * layer.weight;
    denominator += layer.weight;
  });
  return denominator ? Math.round(numerator / denominator) : 0;
}

function updateAtlas() {
  qsa(".layer-button").forEach((button) => {
    const isActive = activeLayers.has(button.dataset.layer);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  qsa("[data-layer-overlay]").forEach((overlay) => {
    overlay.classList.toggle("active", activeLayers.has(overlay.dataset.layerOverlay));
  });

  qsa("[data-layer-row]").forEach((row) => {
    const layer = layerDefinitions.find((item) => item.id === row.dataset.layerRow);
    const isActive = activeLayers.has(layer.id);
    row.style.opacity = isActive ? "1" : "0.34";
    const fill = qs(".chart-fill", row);
    fill.style.setProperty("--value", isActive ? `${Math.round(layer.weight * 100)}%` : "0%");
  });

  const score = weightedRiskFor(activeSite);
  qs("#atlas-score").textContent = String(score);
  qs("#atlas-recommendation").textContent =
    score >= 80 ? "Cluster 0 remains the highest intervention priority." : "Cluster 0 needs a narrower evidence package.";
  qs("#atlas-rationale").textContent =
    score >= 80
      ? `${activeSite.label} holds a high product priority because the active evidence layers converge around risk and implementation urgency.`
      : `${activeSite.label} drops when the active layers remove flood, waste, or population pressure from the decision model.`;
}

function renderSiteTabs() {
  const tabs = qs("#site-tabs");
  tabs.innerHTML = "";

  sites.forEach((site) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "site-button";
    button.dataset.site = site.id;
    button.textContent = site.label;
    button.addEventListener("click", () => {
      activeSite = site;
      updateSite();
      updateAtlas();
    });
    tabs.appendChild(button);
  });
}

function updateSite() {
  qsa(".site-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.site === activeSite.id);
  });

  qs("#site-title").textContent = activeSite.label;
  qs("#site-score").textContent = String(activeSite.score);
  qs("#site-copy").textContent = activeSite.copy;

  const highlight = qs("#cell-highlight");
  highlight.style.setProperty("--cell-x", activeSite.x);
  highlight.style.setProperty("--cell-y", activeSite.y);
  highlight.innerHTML = `<span>${activeSite.label}</span>`;

  const bars = qs("#feature-bars");
  bars.innerHTML = "";
  layerDefinitions.forEach((layer) => {
    const value = activeSite.features[layer.id] || 0;
    const row = document.createElement("div");
    row.className = "feature-row";
    row.style.setProperty("--row-color", layer.color);
    row.style.setProperty("--value", `${value}%`);
    row.innerHTML = `
      <span>${layer.short}</span>
      <span class="feature-track"><span class="feature-fill"></span></span>
      <span>${value}</span>
    `;
    bars.appendChild(row);
  });
}

function renderStrategies() {
  const tabs = qs("#strategy-tabs");
  tabs.innerHTML = "";

  strategies.forEach((strategy) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "strategy-button";
    button.dataset.strategy = strategy.id;
    button.style.setProperty("--strategy-color", strategy.color);
    button.innerHTML = `
      <span>${strategy.time}</span>
      <strong>${strategy.name}</strong>
      <small>${strategy.area} territory</small>
    `;
    button.addEventListener("click", () => {
      activeStrategy = strategy;
      updateStrategy();
    });
    tabs.appendChild(button);
  });
}

function updateStrategy() {
  qs(".strategy-layout").style.setProperty("--strategy-accent", activeStrategy.color);
  qsa(".strategy-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.strategy === activeStrategy.id);
  });
  qs("#strategy-name").textContent = activeStrategy.name;
  qs("#strategy-area").textContent = activeStrategy.area;
  qs("#strategy-time").textContent = activeStrategy.time;
  qs("#strategy-physical").textContent = activeStrategy.physical;
  qs("#strategy-digital").textContent = activeStrategy.digital;
  qs("#strategy-role").textContent = activeStrategy.role;
}

function renderHubTabs() {
  const tabs = qs("#hub-tabs");
  tabs.innerHTML = "";

  hubViews.forEach((view) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hub-button";
    button.dataset.view = view.id;
    button.textContent = view.label;
    button.addEventListener("click", () => {
      activeHubView = view;
      updateHubView();
    });
    tabs.appendChild(button);
  });
}

function updateHubView() {
  qsa(".hub-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === activeHubView.id);
  });

  const viewer = qs(".hub-viewer");
  const image = qs("#hub-image");
  viewer.classList.add("is-switching");
  window.setTimeout(() => {
    image.src = activeHubView.image;
    image.alt = activeHubView.title;
    qs("#hub-view-title").textContent = activeHubView.title;
    qs("#hub-view-copy").textContent = activeHubView.copy;
    qs("#monitor-overlay").classList.toggle("is-visible", activeHubView.monitoring);
    viewer.classList.remove("is-switching");
  }, 140);
}

function drawAutomata(stageIndex, phase = 0) {
  const canvas = qs("#ca-canvas");
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const cells = 42;
  const cell = size / cells;
  const colors = ["#ef4b4b", "#73d35c", "#67a8ff", "#8c78ff", "#20242b"];

  ctx.fillStyle = "#080b10";
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(255,255,255,0.045)";
  ctx.lineWidth = 1;

  for (let i = 0; i <= cells; i += 1) {
    const p = Math.round(i * cell) + 0.5;
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, p);
    ctx.lineTo(size, p);
    ctx.stroke();
  }

  const centerX = 20 + stageIndex * 1.7;
  const centerY = 21 - stageIndex * 0.8;
  const radius = 8 + stageIndex * 4.5;

  for (let y = 0; y < cells; y += 1) {
    for (let x = 0; x < cells; x += 1) {
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const boundary = Math.sin(x * 0.75 + phase) + Math.cos(y * 0.55 - phase);
      const inSite = dist < radius + boundary * (2.4 + stageIndex * 0.5);
      if (!inSite) continue;

      const index = Math.abs(Math.floor((x * 13 + y * 17 + stageIndex * 11 + boundary * 7) % 4));
      const opacity = Math.min(0.94, 0.24 + stageIndex * 0.15 + Math.max(0, radius - dist) / 28);
      ctx.fillStyle = hexToRgba(colors[index], opacity);
      ctx.fillRect(x * cell + 1, y * cell + 1, cell - 1.6, cell - 1.6);
    }
  }

  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.16) {
    const r = radius + Math.sin(a * 5 + phase) * 2.5;
    const x = (centerX + Math.cos(a) * r) * cell;
    const y = (centerY + Math.sin(a) * r) * cell;
    if (a === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = "12px Courier New";
  ctx.fillText(`NCA step ${stageIndex + 1}`, 16, 24);
}

function hexToRgba(hex, alpha) {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function updateMlStage(stageIndex) {
  const stage = mlStages[stageIndex];
  qs("#ml-stage-label").textContent = stage.label;
  qs("#ml-stage-title").textContent = stage.title;
  qs("#ml-stage-description").textContent = stage.description;
  drawAutomata(stageIndex);
}

function setupMlControls() {
  const slider = qs("#ml-step");
  const runButton = qs("#run-inference");

  slider.addEventListener("input", () => {
    updateMlStage(Number(slider.value));
  });

  runButton.addEventListener("click", () => {
    window.clearInterval(animationTimer);
    let step = 0;
    let phase = 0;
    runButton.disabled = true;
    runButton.textContent = "Running";
    animationTimer = window.setInterval(() => {
      slider.value = String(step);
      updateMlStage(step);
      drawAutomata(step, phase);
      phase += 0.9;
      step += 1;
      if (step > 4) {
        window.clearInterval(animationTimer);
        runButton.disabled = false;
        runButton.textContent = "Run inference";
      }
    }, 430);
  });
}

function setupNavigation() {
  const sections = qsa(".section-observe");
  const navLinks = qsa(".stage-nav a");
  const progressBar = qs("#progress-bar");

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id;
      if (!id) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    },
    { threshold: [0.24, 0.42, 0.6] },
  );

  sections.forEach((section) => observer.observe(section));

  window.addEventListener("scroll", () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progressBar.style.setProperty("--progress", `${progress}%`);
  }, { passive: true });
}

function init() {
  renderLayerControls();
  renderSiteTabs();
  renderStrategies();
  renderHubTabs();
  setupMlControls();
  setupNavigation();
  updateSite();
  updateAtlas();
  updateStrategy();
  updateHubView();
  updateMlStage(Number(qs("#ml-step").value));
}

init();

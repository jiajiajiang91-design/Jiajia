const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const materialData = [
  {
    id: "pineapple",
    object: "Pineapple",
    name: "Pineapple Skin",
    function: "Food / decoration / fibrous textile memory",
    input: "Decayed sliced pineapple",
    output: "Hygromorphic actuator",
    module: "Humidity-sensitive ventilation skin",
    status: "Swelling and retention",
    signal: "Moisture signal: 90% to 32%",
    sample: "15 days sample",
    desc: "Porous pineapple epidermis becomes a humidity-sensitive ventilation skin for the facade.",
    thumbnail: "assets/page10.jpg",
    scanImage: "assets/page11.jpg",
    board: "assets/page12.jpg",
    color: "#84d184",
    chart: {
      labels: ["1", "2", "4", "8", "15"],
      temp: [22.4, 22.7, 22.9, 23.2, 23.3],
      humidity: [90, 88, 78, 65, 32],
    },
    metrics: [
      ["Humidity", "90 to 32%", "fresh fruit to low moisture"],
      ["Aperture", "45°", "ventilation closes under cold stress"],
      ["Affinity", "5x", "hyper-absorbent sponge reading"],
      ["Role", "Skin", "porous outer membrane"],
    ],
    traits: ["Hygroscopy", "Swelling force", "Ventilation aperture", "Porous epidermis"],
    layers: ["Pineapple stomata skin", "Vascular water channel", "Wax PCM buffer", "Digital sensor mesh"],
  },
  {
    id: "wax",
    object: "Candle",
    name: "Wax Skeleton",
    function: "Lighting / heating / phase-change storage",
    input: "Decayed wax block",
    output: "Latent heat battery",
    module: "Thermal damping shell",
    status: "Phase change active",
    signal: "Temperature signal: 24°C to 89.3°C",
    sample: "200 seconds sample",
    desc: "Domestic wax becomes a latent heat battery that absorbs daytime heat and releases it at night.",
    thumbnail: "assets/page13.jpg",
    scanImage: "assets/page15.jpg",
    board: "assets/page16.jpg",
    color: "#f0b545",
    chart: {
      labels: ["0", "50", "100", "150", "200"],
      temp: [24, 46, 57.5, 69, 89.3],
      humidity: [8, 14, 31, 58, 66],
    },
    metrics: [
      ["Thermal rise", "89.3°C", "surrounding temperature rising"],
      ["State", "Liquid", "solid to flowing phase"],
      ["Release", "65%", "night mode buffer"],
      ["Role", "Battery", "latent heat reserve"],
    ],
    traits: ["Solidification", "Heat damping", "PCM storage", "Transparent shell"],
    layers: ["Transparent wax shell", "PCM thermal core", "Aluminum heat fin", "Night release aperture"],
  },
  {
    id: "mycelium",
    object: "Needle Mushroom",
    name: "Mycelium Block",
    function: "Food / decomposer / porous composite",
    input: "Decayed mycelial strand",
    output: "Composite filling",
    module: "Metabolic infill cistern",
    status: "Selective baking",
    signal: "Moisture signal: 63% to 3%",
    sample: "6 minutes heated sample",
    desc: "Mycelium is translated into a graded porous block that stores water and supports facade infill.",
    thumbnail: "assets/page18.jpg",
    scanImage: "assets/page19.jpg",
    board: "assets/page20.jpg",
    color: "#f4f1e8",
    chart: {
      labels: ["0", "1", "2", "4", "6"],
      temp: [35, 49.5, 61, 78.8, 86],
      humidity: [52, 63, 38, 18, 3],
    },
    metrics: [
      ["Porosity", "High", "hyphae network reservoir"],
      ["Drying", "Rapid", "moisture reduced under heating"],
      ["Cistern", "Active", "water channel and storage"],
      ["Role", "Infill", "structural composite"],
    ],
    traits: ["Hyphae network", "Moisture storage", "Compression", "Selective baking"],
    layers: ["Myco-cistern shell", "Hyphae water pocket", "Compressed grain layer", "Root interface"],
  },
  {
    id: "bread",
    object: "Bread",
    name: "Bread Reactor",
    function: "Food / fermentation / energy culture",
    input: "Moldy bread",
    output: "Culture vessel",
    module: "Fermentation core engine",
    status: "Metabolic rate high",
    signal: "Humidity signal: 87% to 18%",
    sample: "20 days sample",
    desc: "Bread waste becomes a culture vessel that drives microbial exchange and metabolic energy.",
    thumbnail: "assets/page21.jpg",
    scanImage: "assets/page22.jpg",
    board: "assets/page23.jpg",
    color: "#ff725f",
    chart: {
      labels: ["1", "5", "10", "15", "20"],
      temp: [23, 20.1, 21.1, 18.2, 13.2],
      humidity: [87, 61, 56, 50, 18],
    },
    metrics: [
      ["Culture", "Live", "mold and yeast activation"],
      ["Moisture", "18%", "complete dehydration endpoint"],
      ["Energy", "263kcal", "nutrient substrate memory"],
      ["Role", "Engine", "fermentation reactor"],
    ],
    traits: ["Fermentation", "Microbial heat", "CO2 exchange", "Culture vessel"],
    layers: ["Bread reactor vessel", "Microbial culture tray", "Gas exchange column", "Sensor cap"],
  },
  {
    id: "cherry",
    object: "Winter Cherry",
    name: "Winter Cherry Switch",
    function: "Plant / leaf abscission / seasonal sensing",
    input: "Fallen winter cherry leaves",
    output: "Biological switch",
    module: "Seasonal feedback actuator",
    status: "Leaf detachment",
    signal: "Humidity signal: 42% to 5%",
    sample: "13 days sample",
    desc: "Winter cherry decay becomes a seasonal switch that drives hibernation and respiration modes.",
    thumbnail: "assets/page24.jpg",
    scanImage: "assets/page25.jpg",
    board: "assets/page28.jpg",
    color: "#a896ff",
    chart: {
      labels: ["1", "3", "6", "10", "13"],
      temp: [18.1, 18, 17.9, 18, 18.1],
      humidity: [42, 35, 28, 16, 5],
    },
    metrics: [
      ["Leaf count", "10%", "winter protocol threshold"],
      ["Humidity", "5%", "dry totally"],
      ["Mode", "Switch", "biological seasonal trigger"],
      ["Role", "Logic", "algorithmic feedback"],
    ],
    traits: ["Abscission", "Seasonal logic", "Feedback loop", "Plant drone"],
    layers: ["Cherry leaf sensor", "Seasonal switch stem", "Root chamber", "Feedback light channel"],
  },
];

const atlasBoards = [
  ["01", "Programming Decay", "overview"],
  ["02", "Focus on Programmable Decay", "overview"],
  ["03", "Observation & Scanning", "observation"],
  ["04", "Select Objects", "observation"],
  ["05", "Broader Ecosystem Matrix", "observation"],
  ["06", "Metabolic Cyclicality Map", "observation"],
  ["07", "Strategic Framework", "overview"],
  ["08", "Proposed Intervention", "overview"],
  ["09", "Material Decoding", "material"],
  ["10", "Pineapple Decoding", "material"],
  ["11", "Pineapple Hygroscopy", "material"],
  ["12", "Pineapple Transformation", "material"],
  ["13", "Wax Decoding", "material"],
  ["14", "Wax Performance", "material"],
  ["15", "Latent Heat Battery", "material"],
  ["16", "Wax Failure Analysis", "material"],
  ["17", "AI Iterative Wax Design", "material"],
  ["18", "Mycelium Decoding", "material"],
  ["19", "Mycelium Mechanisms", "material"],
  ["20", "Myco-Cistern Block", "material"],
  ["21", "Bread Decoding", "material"],
  ["22", "Bread Decomposition", "material"],
  ["23", "Bread Reactor", "material"],
  ["24", "Organic Waste to Actuator", "material"],
  ["25", "Winter Cherry Decay", "material"],
  ["26", "Morphological Evolution", "material"],
  ["27", "Plant Drone Mechanism", "material"],
  ["28", "Feedback Loop Translation", "material"],
  ["29", "System Integration", "integration"],
  ["30", "Physical Model", "integration"],
  ["31", "3D Digital Modeling", "integration"],
  ["32", "Exploded Wall Unit", "integration"],
  ["33", "Modular Vascular Assembly", "integration"],
  ["34", "Living Facade Retrofit", "integration"],
  ["35", "Urban Heat Island Mitigation", "integration"],
  ["36", "Arduino Environmental Sensors", "protocol"],
  ["37", "Logic Protocol", "protocol"],
  ["38", "Reference", "overview"],
].map(([num, title, category]) => ({
  num,
  title,
  category,
  src: `assets/page${num}.jpg`,
}));

const categoryLabels = {
  all: "All",
  overview: "Overview",
  observation: "Observation",
  material: "Material",
  integration: "Integration",
  protocol: "Protocol",
};

const viewTitles = {
  scan: "Observation & Scanning",
  decode: "Material Decoding & Transformation",
  build: "System Integration",
  twin: "Digital Twin Protocol",
  atlas: "Source Atlas",
};

const state = {
  materialId: "pineapple",
  view: "scan",
  mode: "hibernation",
  brush: "pineapple",
  atlasFilter: "all",
  live: true,
  tick: 0,
  facade: [],
};

const materialById = (id) => materialData.find((item) => item.id === id) || materialData[0];

function renderMaterialList() {
  const list = $("#materialList");
  list.innerHTML = materialData
    .map(
      (item) => `
        <button class="material-card ${item.id === state.materialId ? "active" : ""}" data-material="${item.id}">
          <img src="${item.thumbnail}" alt="${item.object}" />
          <span>
            <strong>${item.object}</strong>
            <span>${item.output}</span>
          </span>
        </button>
      `,
    )
    .join("");

  list.querySelectorAll("[data-material]").forEach((button) => {
    button.addEventListener("click", () => {
      state.materialId = button.dataset.material;
      state.brush = state.materialId;
      renderAll();
    });
  });
}

function renderScan() {
  const item = materialById(state.materialId);
  $("#materialName").textContent = item.name;
  $("#scanKicker").textContent = item.input;
  $("#stageStatus").textContent = item.status;
  $("#scanImage").src = item.scanImage;
  $("#scanImage").alt = `${item.name} board`;
  $("#scanOutput").textContent = item.output;
  $("#scanSignal").textContent = item.signal;
  $("#sampleWindow").textContent = item.sample;
  $("#moduleDescription").textContent = item.desc;

  $("#metricGrid").innerHTML = item.metrics
    .map(
      ([label, value, note]) => `
        <div class="metric-card">
          <span>${label}</span>
          <strong>${value}</strong>
          <em>${note}</em>
        </div>
      `,
    )
    .join("");

  drawSeriesChart($("#scanChart"), item.chart, {
    titleA: "Temp",
    titleB: "Humidity",
    colorA: "#7ed0dc",
    colorB: item.color,
  });
}

function renderDecode() {
  const item = materialById(state.materialId);
  $("#decodeInput").textContent = item.input;
  $("#decodeOutput").textContent = item.output;
  $("#decodeInputImg").src = item.board;
  $("#decodeInputImg").alt = `${item.name} transformation board`;
  const visual = $("#moduleVisual");
  visual.className = `module-visual ${item.id}`;
  visual.style.setProperty("--twist", `${12 + state.tick * 3}deg`);

  $("#logicStrip").innerHTML = item.traits
    .map(
      (trait, index) => `
        <div class="logic-chip">
          <span>0${index + 1}</span>
          <strong>${trait}</strong>
        </div>
      `,
    )
    .join("");

  updateControlOutputs();
}

function updateControlOutputs() {
  const item = materialById(state.materialId);
  const temp = Number($("#tempRange").value);
  const humidity = Number($("#humidityRange").value);
  const bio = Number($("#bioRange").value);
  $("#tempOut").textContent = `${temp}°C`;
  $("#humidityOut").textContent = `${humidity}%`;
  $("#bioOut").textContent = `${bio}%`;
  $("#algoMode").textContent = state.mode.toUpperCase();

  const cold = temp < 10 || state.mode === "hibernation";
  const wet = humidity > 58;
  const activity = Math.max(8, Math.min(96, Math.round((bio * 0.48 + humidity * 0.32 + temp * 0.72) / 1.35)));
  const aperture = cold ? Math.max(6, Math.round(54 - humidity * 0.34)) : Math.min(88, Math.round(28 + humidity * 0.52));
  const heat = item.id === "wax" ? Math.min(95, Math.round(42 + temp * 1.18)) : Math.max(10, Math.round(activity * 0.72));
  const filtration = item.id === "mycelium" ? Math.min(94, Math.round(44 + humidity * 0.48)) : Math.round((humidity + bio) / 2);
  const growth = item.id === "bread" || item.id === "cherry" ? Math.min(92, Math.round(28 + bio * 0.58)) : Math.round(bio * 0.72);

  $("#algorithmText").textContent = buildAlgorithmText(item, { temp, humidity, bio, cold, wet });
  $("#responseState").textContent = cold ? "hibernation aperture closes" : "respiration aperture opens";
  $("#responseReadouts").innerHTML = [
    ["Aperture", `${aperture}%`],
    ["Heat release", `${heat}%`],
    ["Filtration", `${filtration}%`],
    ["Growth pulse", `${growth}%`],
  ]
    .map(
      ([label, value]) => `
        <div class="readout">
          <span>${label}</span>
          <strong>${value}</strong>
        </div>
      `,
    )
    .join("");

  drawResponseCanvas($("#responseCanvas"), {
    temp,
    humidity,
    bio,
    color: item.color,
    cold,
    activity,
  });
  renderTwin();
}

function buildAlgorithmText(item, values) {
  const modeName = values.cold ? "HIBERNATION" : "RESPIRATION";
  const skinAction = values.cold ? "Close" : "Open";
  const waxState = values.cold ? "Solid_Insulator" : "Liquid_Heatsink";
  const reactor = values.bio > 55 ? "Activate" : "Idle";
  const color = values.cold ? "Blue_Glitch" : "Green_Bloom";

  return `IF (Ambient_Temp < 10°C OR Mode == "${state.mode.toUpperCase()}") {
  Mode = "${modeName}";
  ${item.name.replaceAll(" ", "_")}.${skinAction}();
  Bread_Reactor.${reactor}(target = 40°C);
  Wax_Skeleton.State = "${waxState}";
  Sensor.Humidity = ${values.humidity}%;
  Digital_Environment.Color = "${color}";
}

OUTPUT {
  Material = "${item.output}";
  Biomass_Load = ${values.bio}%;
  Response = "${item.module}";
}`;
}

function renderPalette() {
  const palette = $("#modulePalette");
  palette.innerHTML = materialData
    .map(
      (item) => `
        <button class="module-option ${item.id === state.brush ? "active" : ""}" data-brush="${item.id}">
          <span class="module-swatch ${item.id}"></span>
          <span>
            <strong>${item.name}</strong>
            <span>${item.module}</span>
          </span>
        </button>
      `,
    )
    .join("");

  palette.querySelectorAll("[data-brush]").forEach((button) => {
    button.addEventListener("click", () => {
      state.brush = button.dataset.brush;
      $("#activeBrushLabel").textContent = `Brush: ${materialById(state.brush).name}`;
      renderPalette();
    });
  });
}

function initFacade() {
  if (state.facade.length) return;
  const pattern = ["pineapple", "wax", "mycelium", "bread", "cherry"];
  state.facade = Array.from({ length: 54 }, (_, index) => pattern[(index + Math.floor(index / 6)) % pattern.length]);
}

function renderFacade() {
  initFacade();
  const grid = $("#facadeGrid");
  grid.innerHTML = state.facade
    .map((id, index) => `<button class="facade-cell ${id}" data-cell="${index}" title="${materialById(id).name}" aria-label="${materialById(id).name}"></button>`)
    .join("");

  grid.querySelectorAll("[data-cell]").forEach((cell) => {
    cell.addEventListener("click", () => {
      state.facade[Number(cell.dataset.cell)] = state.brush;
      renderFacade();
    });
  });

  const counts = materialData.map((item) => [item, state.facade.filter((id) => id === item.id).length]);
  $("#facadeStats").innerHTML = counts
    .slice(0, 4)
    .map(
      ([item, count]) => `
        <div class="readout">
          <span>${item.object}</span>
          <strong>${count} units</strong>
        </div>
      `,
    )
    .join("");
}

function applyPreset(name) {
  const presets = {
    thermal: ["wax", "wax", "pineapple", "mycelium", "wax", "bread"],
    filtration: ["mycelium", "pineapple", "mycelium", "cherry", "pineapple", "mycelium"],
    growth: ["bread", "cherry", "pineapple", "mycelium", "bread", "cherry"],
  };
  const preset = presets[name] || presets.thermal;
  state.facade = Array.from({ length: 54 }, (_, index) => preset[(index + Math.floor(index / 6)) % preset.length]);
  renderFacade();
}

function renderLayers() {
  const item = materialById(state.materialId);
  const layers = ["Bio-sensor mesh", ...item.layers, "Parametric facade frame"].slice(0, 6);
  $("#layerList").innerHTML = layers
    .map(
      (layer, index) => `
        <div class="layer-item">
          <span class="layer-index">${index + 1}</span>
          <span>${layer}</span>
        </div>
      `,
    )
    .join("");
}

function renderTwin() {
  const item = materialById(state.materialId);
  const temp = Number($("#tempRange")?.value || 8);
  const humidity = Number($("#humidityRange")?.value || 38);
  const bio = Number($("#bioRange")?.value || 62);
  const exploration = Math.min(99, Math.max(20, Math.round(36 + state.tick * 4 + bio * 0.24)));
  const activity = Math.min(99, Math.max(18, Math.round((humidity + bio) / 2 + (state.mode === "respiration" ? 22 : 5))));
  const achievements = Math.min(98, Math.max(12, Math.round(22 + temp + state.tick * 2)));
  const gauges = [
    ["Exploration", exploration, "#7ed0dc"],
    ["Activity", activity, item.color],
    ["Achievements", achievements, "#f0b545"],
  ];

  $("#gaugeRow").innerHTML = gauges
    .map(
      ([label, value, color]) => `
        <div class="gauge">
          <div class="gauge-ring" style="--gauge-value:${value}%; --gauge-color:${color}">
            <strong>${value}%</strong>
          </div>
          <span>${label}</span>
        </div>
      `,
    )
    .join("");

  const actuatorValues = [
    ["Bread Reactor", item.id === "bread" ? 92 : Math.round(54 + bio * 0.28), "fermentation core"],
    ["Wax Skeleton", item.id === "wax" ? 91 : Math.round(40 + temp * 1.1), "phase change buffer"],
    ["Pineapple Skin", item.id === "pineapple" ? 88 : Math.round(30 + humidity * 0.48), "ventilation aperture"],
    ["Mycelium Cistern", item.id === "mycelium" ? 89 : Math.round(36 + humidity * 0.42), "water storage"],
  ];

  $("#actuatorStack").innerHTML = actuatorValues
    .map(
      ([name, value, note]) => `
        <div class="actuator-item">
          <header><strong>${name}</strong><span>${value}%</span></header>
          <div class="bar"><span style="width:${Math.min(100, value)}%"></span></div>
          <small>${note}</small>
        </div>
      `,
    )
    .join("");

  $("#actuatorMode").textContent = state.mode === "hibernation" ? "phase change active" : "ventilation active";
  $("#eventLog").innerHTML = [
    ["Sensor", `${item.object} trace synchronized with facade unit ${String(state.tick + 1).padStart(2, "0")}.`],
    ["Processing", `${state.mode.toUpperCase()} protocol maps ${item.output.toLowerCase()} to ${item.module.toLowerCase()}.`],
    ["Output", state.mode === "hibernation" ? "Aperture closing, wax buffer rises, reactor warms." : "Aperture opening, cistern breathes, growth pulse increases."],
  ]
    .map(
      ([label, body]) => `
        <div class="event">
          <strong>${label}</strong> ${body}
        </div>
      `,
    )
    .join("");

  drawDashboardChart($("#dashboardChart"), item, { temp, humidity, bio });
}

function renderHotspots() {
  $("#touchHotspots").innerHTML = [
    ["37%", "45%", "sensor input"],
    ["63%", "53%", "facade actuator"],
    ["78%", "66%", "eco-cycle"],
  ]
    .map(([left, top, label]) => `<span class="hotspot" style="left:${left};top:${top}" data-label="${label}"></span>`)
    .join("");
}

function renderAtlasFilters() {
  $("#atlasFilters").innerHTML = Object.entries(categoryLabels)
    .map(
      ([id, label]) => `
        <button class="mode-btn ${id === state.atlasFilter ? "active" : ""}" data-filter="${id}">${label}</button>
      `,
    )
    .join("");

  $("#atlasFilters").querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.atlasFilter = button.dataset.filter;
      renderAtlas();
      renderAtlasFilters();
    });
  });
}

function renderAtlas() {
  const boards = state.atlasFilter === "all" ? atlasBoards : atlasBoards.filter((board) => board.category === state.atlasFilter);
  $("#atlasGrid").innerHTML = boards
    .map(
      (board) => `
        <button class="atlas-card" data-board="${board.num}">
          <img src="${board.src}" alt="${board.title}" loading="lazy" />
          <div>
            <strong>${board.num}. ${board.title}</strong>
            <span>${categoryLabels[board.category]}</span>
          </div>
        </button>
      `,
    )
    .join("");

  $("#atlasGrid").querySelectorAll("[data-board]").forEach((button) => {
    button.addEventListener("click", () => openBoard(button.dataset.board));
  });
}

function openBoard(num) {
  const board = atlasBoards.find((item) => item.num === num);
  if (!board) return;
  $("#dialogImage").src = board.src;
  $("#dialogImage").alt = board.title;
  $("#dialogTitle").textContent = `${board.num}. ${board.title}`;
  $("#dialogMeta").textContent = categoryLabels[board.category];
  const dialog = $("#imageDialog");
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function drawSeriesChart(canvas, chart, options) {
  if (!canvas) return;
  const ctx = prepareCanvas(canvas);
  const width = canvas.width;
  const height = canvas.height;
  const pad = 34 * devicePixelRatio;
  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx, width, height, pad);
  drawLine(ctx, chart.temp, options.colorA, width, height, pad);
  drawLine(ctx, chart.humidity, options.colorB, width, height, pad);
  drawLabels(ctx, chart.labels, width, height, pad);
  ctx.fillStyle = options.colorA;
  ctx.fillText(options.titleA, pad, 18 * devicePixelRatio);
  ctx.fillStyle = options.colorB;
  ctx.fillText(options.titleB, pad + 64 * devicePixelRatio, 18 * devicePixelRatio);
}

function drawResponseCanvas(canvas, values) {
  if (!canvas) return;
  const ctx = prepareCanvas(canvas);
  const width = canvas.width;
  const height = canvas.height;
  const pad = 36 * devicePixelRatio;
  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx, width, height, pad);

  const points = Array.from({ length: 22 }, (_, index) => {
    const t = index / 21;
    const wave = Math.sin(t * Math.PI * 2 + state.tick * 0.32) * 0.16;
    const decay = values.cold ? 1 - t * 0.46 : t * 0.58;
    return Math.max(0.05, Math.min(0.94, 0.26 + values.activity / 180 + decay * 0.38 + wave));
  });

  drawNormalizedLine(ctx, points, values.color, width, height, pad, 3);
  ctx.fillStyle = "#f4f1e8";
  ctx.font = `${13 * devicePixelRatio}px ui-sans-serif`;
  ctx.fillText(values.cold ? "Hibernation response" : "Respiration response", pad, 22 * devicePixelRatio);

  const nodeX = pad + (width - pad * 2) * 0.72;
  const nodeY = pad + (height - pad * 2) * (1 - points[15]);
  ctx.strokeStyle = values.color;
  ctx.lineWidth = 2 * devicePixelRatio;
  ctx.beginPath();
  ctx.arc(nodeX, nodeY, 12 * devicePixelRatio, 0, Math.PI * 2);
  ctx.stroke();
}

function drawDashboardChart(canvas, item, values) {
  if (!canvas) return;
  const ctx = prepareCanvas(canvas);
  const width = canvas.width;
  const height = canvas.height;
  const pad = 36 * devicePixelRatio;
  ctx.clearRect(0, 0, width, height);
  drawGrid(ctx, width, height, pad);

  const sensor = Array.from({ length: 26 }, (_, index) => {
    const t = index / 25;
    return 0.35 + Math.sin(t * Math.PI * 3 + state.tick * 0.28) * 0.12 + values.humidity / 260;
  });
  const actuator = Array.from({ length: 26 }, (_, index) => {
    const t = index / 25;
    return 0.2 + Math.cos(t * Math.PI * 2 + state.tick * 0.2) * 0.1 + values.bio / 190;
  });
  const temp = Array.from({ length: 26 }, (_, index) => {
    const t = index / 25;
    return 0.16 + t * 0.42 + values.temp / 120 + Math.sin(t * Math.PI * 5) * 0.05;
  });

  drawNormalizedLine(ctx, sensor, item.color, width, height, pad, 2);
  drawNormalizedLine(ctx, actuator, "#7ed0dc", width, height, pad, 2);
  drawNormalizedLine(ctx, temp, "#f0b545", width, height, pad, 2);
  ctx.fillStyle = "#f4f1e8";
  ctx.font = `${13 * devicePixelRatio}px ui-sans-serif`;
  ctx.fillText("Composite temperature / humidity / actuator trace", pad, 22 * devicePixelRatio);
}

function prepareCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(280, Math.round(rect.width * dpr));
  const height = Math.max(180, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext("2d");
  ctx.font = `${11 * dpr}px ui-sans-serif`;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  return ctx;
}

function drawGrid(ctx, width, height, pad) {
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = Math.max(1, devicePixelRatio);
  for (let i = 0; i <= 5; i += 1) {
    const y = pad + ((height - pad * 2) / 5) * i;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  }
  for (let i = 0; i <= 6; i += 1) {
    const x = pad + ((width - pad * 2) / 6) * i;
    ctx.beginPath();
    ctx.moveTo(x, pad);
    ctx.lineTo(x, height - pad);
    ctx.stroke();
  }
}

function drawLine(ctx, values, color, width, height, pad) {
  const max = Math.max(...values, 100);
  const normalized = values.map((value) => value / max);
  drawNormalizedLine(ctx, normalized, color, width, height, pad, 2.5);
}

function drawNormalizedLine(ctx, values, color, width, height, pad, lineWidth) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth * devicePixelRatio;
  ctx.beginPath();
  values.forEach((value, index) => {
    const x = pad + ((width - pad * 2) / Math.max(1, values.length - 1)) * index;
    const y = height - pad - (height - pad * 2) * value;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  values.forEach((value, index) => {
    const x = pad + ((width - pad * 2) / Math.max(1, values.length - 1)) * index;
    const y = height - pad - (height - pad * 2) * value;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 3.2 * devicePixelRatio, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawLabels(ctx, labels, width, height, pad) {
  ctx.fillStyle = "rgba(244,241,232,0.62)";
  ctx.font = `${10 * devicePixelRatio}px ui-sans-serif`;
  labels.forEach((label, index) => {
    const x = pad + ((width - pad * 2) / Math.max(1, labels.length - 1)) * index;
    ctx.fillText(label, x - 5 * devicePixelRatio, height - 10 * devicePixelRatio);
  });
}

function setView(view) {
  state.view = view;
  $$(".view").forEach((section) => section.classList.remove("active"));
  $(`#${view}View`).classList.add("active");
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  $("#screenTitle").textContent = viewTitles[view];
  requestAnimationFrame(renderChartsForActiveView);
}

function setMode(mode) {
  state.mode = mode;
  document.body.dataset.mode = mode;
  $$(".mode-btn[data-mode]").forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
  updateControlOutputs();
}

function renderChartsForActiveView() {
  if (state.view === "scan") renderScan();
  if (state.view === "decode") updateControlOutputs();
  if (state.view === "twin") renderTwin();
}

function renderAll() {
  renderMaterialList();
  renderScan();
  renderDecode();
  renderPalette();
  renderFacade();
  renderLayers();
  renderTwin();
  $("#activeBrushLabel").textContent = `Brush: ${materialById(state.brush).name}`;
}

function bindEvents() {
  $$(".nav-item[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  $$(".mode-btn[data-mode]").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });

  ["tempRange", "humidityRange", "bioRange"].forEach((id) => {
    $(`#${id}`).addEventListener("input", updateControlOutputs);
  });

  $$(".text-btn[data-preset]").forEach((button) => {
    button.addEventListener("click", () => applyPreset(button.dataset.preset));
  });

  $("#runToggle").addEventListener("click", () => {
    state.live = !state.live;
    document.body.classList.toggle("paused", !state.live);
    $("#runToggle").innerHTML = state.live
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7-11-7Z"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
  });

  $("#dialogClose").addEventListener("click", () => $("#imageDialog").close());
  $("#imageDialog").addEventListener("click", (event) => {
    if (event.target.id === "imageDialog") $("#imageDialog").close();
  });

  window.addEventListener("resize", () => requestAnimationFrame(renderChartsForActiveView));
}

function startClock() {
  window.setInterval(() => {
    if (!state.live) return;
    state.tick = (state.tick + 1) % 18;
    if (state.view === "decode") updateControlOutputs();
    if (state.view === "twin") renderTwin();
  }, 1400);
}

function init() {
  document.body.dataset.mode = state.mode;
  renderAtlasFilters();
  renderAtlas();
  renderHotspots();
  bindEvents();
  renderAll();
  startClock();
}

init();

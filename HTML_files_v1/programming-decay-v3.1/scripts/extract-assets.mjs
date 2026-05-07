import fs from "node:fs/promises";
import * as pdfjs from "file:///C:/Users/jiang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "file:///C:/Users/jiang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas/index.js";

const pdfPath = "D:/Claude_jiajia/Documents/RC18_Jiang_Pei_Programming Decay.pdf";
const outDir = new URL("../assets/pdf/", import.meta.url);

const pages = [
  { page: 1, name: "cover" },
  { page: 25, name: "gis-base" },
  { page: 28, name: "classification" },
  { page: 31, name: "sentiment-integration" },
  { page: 32, name: "data-to-strategy" },
  { page: 34, name: "strategy-os" },
  { page: 37, name: "ml-prd" },
  { page: 38, name: "pix2pix-source" },
  { page: 39, name: "pix2pix-setup" },
  { page: 40, name: "pix2pix-training" },
  { page: 41, name: "pix2pix-epochs" },
  { page: 42, name: "nca-bridge" },
  { page: 44, name: "site-plan" },
  { page: 45, name: "axonometric" },
  { page: 46, name: "section-perspective" },
  { page: 47, name: "hub-field" },
  { page: 48, name: "skybridge" },
  { page: 49, name: "aerial-view" },
  { page: 50, name: "hub-sequence" },
  { page: 51, name: "monitoring" },
];

class CanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    return { canvas, context: canvas.getContext("2d") };
  }

  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }

  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
  }
}

await fs.mkdir(outDir, { recursive: true });

const bytes = await fs.readFile(pdfPath);
const doc = await pdfjs.getDocument({
  data: new Uint8Array(bytes),
  disableWorker: true,
  disableFontFace: true,
  useSystemFonts: true,
}).promise;

for (const item of pages) {
  const page = await doc.getPage(item.page);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = Math.min(1920 / baseViewport.width, 1360 / baseViewport.height);
  const viewport = page.getViewport({ scale });
  const canvasFactory = new CanvasFactory();
  const target = canvasFactory.create(Math.ceil(viewport.width), Math.ceil(viewport.height));

  await page.render({
    canvasContext: target.context,
    viewport,
    canvasFactory,
  }).promise;

  const output = new URL(`${item.name}.png`, outDir);
  await fs.writeFile(output, await target.canvas.encode("png"));
  console.log(`${item.name}.png <- page ${item.page}`);
}

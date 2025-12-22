/*************************************************
 * Skyline Diffuser Generator (All-in-One)
 * -----------------------------------------------
 * - Randomized Latin-square skyline diffuser
 * - Weight estimation (pine 2x2 + 1/4" plywood)
 * - 8' plank estimator w/ kerf
 * - DOM renderer for visualization
 *************************************************/

/* =========================
   Constants & Materials
   ========================= */

const PINE_DENSITY = 22.0;       // lb / ft³
const PLYWOOD_DENSITY = 34.0;    // lb / ft³
const IN3_PER_FT3 = 1728;

/* =========================
   Utility Functions
   ========================= */

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* =========================
   Diffuser Generator
   ========================= */

function generateDiffuser({
  plywoodWidthIn,
  plywoodHeightIn,
  cellSizeIn = 1.5,
  maxDepthIn = 6.0,
  seed = null
}) {
  if (seed !== null) {
    let s = seed;
    Math.random = () => {
      s = Math.sin(s) * 10000;
      return s - Math.floor(s);
    };
  }

  const N = Math.floor(
    Math.min(plywoodWidthIn, plywoodHeightIn) / cellSizeIn
  );

  if (N < 2) {
    throw new Error("Plywood too small for diffuser grid.");
  }

  // Base Latin square
  let matrix = Array.from({ length: N }, (_, r) =>
    Array.from({ length: N }, (_, c) => ((r + c) % N) + 1)
  );

  // Randomize rows
  matrix = shuffle(matrix);

  // Randomize columns
  const colPerm = shuffle([...Array(N).keys()]);
  matrix = matrix.map(row => colPerm.map(c => row[c]));

  // Randomize symbols
  const symbols = shuffle([...Array(N).keys()].map(i => i + 1));
  const symbolMap = {};
  symbols.forEach((v, i) => (symbolMap[i + 1] = v));
  matrix = matrix.map(row => row.map(v => symbolMap[v]));

  const depthStep = maxDepthIn / N;

  // Build cut list
  const cutList = {};
  matrix.flat().forEach(v => {
    const h = +(v * depthStep).toFixed(3);
    cutList[h] = (cutList[h] || 0) + 1;
  });

  // Weight calculations
  const blockFaceArea = cellSizeIn * cellSizeIn;
  let pineVolumeIn3 = 0;

  for (const [h, qty] of Object.entries(cutList)) {
    pineVolumeIn3 += blockFaceArea * parseFloat(h) * qty;
  }

  const pineWeight = (pineVolumeIn3 / IN3_PER_FT3) * PINE_DENSITY;

  const plywoodVolumeIn3 =
    plywoodWidthIn * plywoodHeightIn * 0.25;

  const plywoodWeight =
    (plywoodVolumeIn3 / IN3_PER_FT3) * PLYWOOD_DENSITY;

  const totalWeight = +(pineWeight + plywoodWeight).toFixed(2);

  return {
    N,
    matrix,
    cutList,
    depthStep,
    totalWeight
  };
}

/* =========================
   8' Plank Estimator
   ========================= */

function estimatePlanks({
  cutList,
  plankLengthIn = 96,
  kerfIn = 0.125
}) {
  const cuts = [];

  for (const [length, qty] of Object.entries(cutList)) {
    for (let i = 0; i < qty; i++) {
      cuts.push(parseFloat(length));
    }
  }

  // First-fit decreasing
  cuts.sort((a, b) => b - a);

  const planks = [];

  cuts.forEach(cut => {
    let placed = false;

    for (const plank of planks) {
      if (plank.remaining >= cut + kerfIn) {
        plank.remaining -= (cut + kerfIn);
        plank.cuts.push(cut);
        placed = true;
        break;
      }
    }

    if (!placed) {
      planks.push({
        remaining: plankLengthIn - cut - kerfIn,
        cuts: [cut]
      });
    }
  });

  return {
    plankCount: planks.length,
    planks
  };
}

/* =========================
   DOM Renderer
   ========================= */

function renderDiffuserMatrix(matrix, options = {}) {
  const {
    cellPx = 20,
    gapPx = 2,
    showValues = true
  } = options;

  const N = matrix.length;
  const container = document.createElement("div");

  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${N}, ${cellPx}px)`;
  container.style.gap = `${gapPx}px`;
  container.style.marginBottom = "16px";

  matrix.forEach(row => {
    row.forEach(value => {
      const cell = document.createElement("div");
      const shade = Math.round(255 * (1 - value / N));

      cell.style.width = `${cellPx}px`;
      cell.style.height = `${cellPx}px`;
      cell.style.backgroundColor = `rgb(${shade},${shade},${shade})`;
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.fontSize = "10px";
      cell.style.fontFamily = "monospace";
      cell.style.border = "1px solid #555";

      if (showValues) {
        cell.textContent = value;
      }

      container.appendChild(cell);
    });
  });

  return container;
}

/* =========================
   Example Usage (Auto-run)
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const diffuser = generateDiffuser({
    plywoodWidthIn: 48,
    plywoodHeightIn: 48,
    maxDepthIn: 6.0,
    seed: 42
  });

  const lumber = estimatePlanks({
    cutList: diffuser.cutList
  });

  console.log("Diffuser grid:", diffuser.N, "x", diffuser.N);
  console.log("Estimated weight:", diffuser.totalWeight, "lb");
  console.log("8' planks required:", lumber.plankCount);

  const info = document.createElement("pre");
  info.textContent =
    `Grid: ${diffuser.N} x ${diffuser.N}\n` +
    `Max depth: 6"\n` +
    `Estimated weight: ${diffuser.totalWeight} lb\n` +
    `8' planks required: ${lumber.plankCount}`;

  const diffuser = document.getElementById('diffuser');
  diffuser.appendChild(info);

  const grid = renderDiffuserMatrix(diffuser.matrix, {
    cellPx: 18,
    showValues: true
  });

  diffuser.appendChild(grid);
});


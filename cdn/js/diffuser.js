/*************************************************
 * Skyline Diffuser Generator (Bottom-of-Page)
 * -----------------------------------------------
 * Safe to include directly before </body>
 *************************************************/

/* =========================
   Constants & Materials
   ========================= */

var PINE_DENSITY = 22.0;       // lb / ft³
var PLYWOOD_DENSITY = 34.0;    // lb / ft³
var IN3_PER_FT3 = 1728;

/* =========================
   Utility Functions
   ========================= */

function shuffle(array) {
  var a = array.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

/* =========================
   Diffuser Generator
   ========================= */

function generateDiffuser(opts) {
  var plywoodWidthIn = opts.plywoodWidthIn;
  var plywoodHeightIn = opts.plywoodHeightIn;
  var cellSizeIn = opts.cellSizeIn || 1.5;
  var maxDepthIn = opts.maxDepthIn || 6.0;
  var seed = opts.seed;

  if (seed !== undefined && seed !== null) {
    var s = seed;
    Math.random = function () {
      s = Math.sin(s) * 10000;
      return s - Math.floor(s);
    };
  }

  var N = Math.floor(
    Math.min(plywoodWidthIn, plywoodHeightIn) / cellSizeIn
  );

  if (N < 2) {
    throw new Error("Plywood too small for diffuser grid.");
  }

  // Base Latin square
  var matrix = [];
  for (var r = 0; r < N; r++) {
    var row = [];
    for (var c = 0; c < N; c++) {
      row.push(((r + c) % N) + 1);
    }
    matrix.push(row);
  }

  // Randomize rows
  matrix = shuffle(matrix);

  // Randomize columns
  var colPerm = shuffle(Array.from({ length: N }, function (_, i) { return i; }));
  matrix = matrix.map(function (row) {
    return colPerm.map(function (c) {
      return row[c];
    });
  });

  // Randomize symbols
  var symbols = shuffle(Array.from({ length: N }, function (_, i) { return i + 1; }));
  var symbolMap = {};
  for (var i = 0; i < N; i++) {
    symbolMap[i + 1] = symbols[i];
  }

  matrix = matrix.map(function (row) {
    return row.map(function (v) {
      return symbolMap[v];
    });
  });

  var depthStep = maxDepthIn / N;

  // Build cut list
  var cutList = {};
  matrix.flat().forEach(function (v) {
    var h = +(v * depthStep).toFixed(3);
    cutList[h] = (cutList[h] || 0) + 1;
  });

  // Weight calculations
  var blockFaceArea = cellSizeIn * cellSizeIn;
  var pineVolumeIn3 = 0;

  for (var h in cutList) {
    pineVolumeIn3 += blockFaceArea * parseFloat(h) * cutList[h];
  }

  var pineWeight = (pineVolumeIn3 / IN3_PER_FT3) * PINE_DENSITY;

  var plywoodVolumeIn3 =
    plywoodWidthIn * plywoodHeightIn * 0.25;

  var plywoodWeight =
    (plywoodVolumeIn3 / IN3_PER_FT3) * PLYWOOD_DENSITY;

  var totalWeight = +(pineWeight + plywoodWeight).toFixed(2);

  return {
    N: N,
    matrix: matrix,
    cutList: cutList,
    depthStep: depthStep,
    totalWeight: totalWeight
  };
}

/* =========================
   8' Plank Estimator
   ========================= */

function estimatePlanks(opts) {
  var cutList = opts.cutList;
  var plankLengthIn = opts.plankLengthIn || 96;
  var kerfIn = opts.kerfIn || 0.125;

  var cuts = [];
  for (var length in cutList) {
    for (var i = 0; i < cutList[length]; i++) {
      cuts.push(parseFloat(length));
    }
  }

  cuts.sort(function (a, b) { return b - a; });

  var planks = [];

  cuts.forEach(function (cut) {
    var placed = false;

    for (var i = 0; i < planks.length; i++) {
      if (planks[i].remaining >= cut + kerfIn) {
        planks[i].remaining -= (cut + kerfIn);
        planks[i].cuts.push(cut);
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
    planks: planks
  };
}

/* =========================
   DOM Renderer
   ========================= */

function renderDiffuserMatrix(matrix, opts) {
  opts = opts || {};
  var cellPx = opts.cellPx || 18;
  var gapPx = opts.gapPx || 2;
  var showValues = opts.showValues !== false;

  var N = matrix.length;
  var container = document.createElement("div");

  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(" + N + ", " + cellPx + "px)";
  container.style.gap = gapPx + "px";
  container.style.marginBottom = "16px";

  matrix.forEach(function (row) {
    row.forEach(function (value) {
      var cell = document.createElement("div");
      var shade = Math.round(255 * (1 - value / N));

      cell.style.width = cellPx + "px";
      cell.style.height = cellPx + "px";
      cell.style.backgroundColor = "rgb(" + shade + "," + shade + "," + shade + ")";
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

var diffuser = generateDiffuser({
  plywoodWidthIn: 48,
  plywoodHeightIn: 48,
  maxDepthIn: 6.0,
  seed: 42
});

var lumber = estimatePlanks({
  cutList: diffuser.cutList
});

console.log("Diffuser grid:", diffuser.N + " x " + diffuser.N);
console.log("Estimated weight:", diffuser.totalWeight, "lb");
console.log("8' planks required:", lumber.plankCount);

var info = document.createElement("pre");
info.textContent =
  "Grid: " + diffuser.N + " x " + diffuser.N + "\n" +
  "Max depth: 6\"\n" +
  "Estimated weight: " + diffuser.totalWeight + " lb\n" +
  "8' planks required: " + lumber.plankCount;

const diffuser = document.getElementById('diffuser');
diffuser.appendChild(info);

var grid = renderDiffuserMatrix(diffuser.matrix, {
  cellPx: 18,
  showValues: true
});

diffuser.appendChild(grid);


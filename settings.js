// =========================
// SETTINGS SYSTEM
// =========================

let settings = {
  volume: 50,
  botDifficulty: "normal",
  graphics: "high",
  showFPS: false
};

// load settings from browser (if saved later)
function loadSettings() {
  const saved = localStorage.getItem("spaceCrewSettings");
  if (saved) {
    settings = JSON.parse(saved);
  }
}

// save settings
function saveSettings() {
  localStorage.setItem("spaceCrewSettings", JSON.stringify(settings));
}

// update volume from UI
function setVolume(value) {
  settings.volume = value;
  saveSettings();
}

// set bot difficulty
function setBotDifficulty(value) {
  settings.botDifficulty = value;
  saveSettings();
}

// set graphics
function setGraphics(value) {
  settings.graphics = value;
  saveSettings();
}

// =========================
// APPLY SETTINGS
// =========================

function applySettings() {
  // This is where later we connect:
  // - particle quality
  // - AI speed
  // - rendering quality

  if (settings.graphics === "low") {
    console.log("Low graphics mode enabled");
  }

  if (settings.botDifficulty === "hard") {
    console.log("Hard bots enabled");
  }
}

// auto-load on script start
loadSettings();
applySettings();

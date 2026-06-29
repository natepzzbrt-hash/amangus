// =========================
// AUDIO SYSTEM
// =========================

// sound registry
const sounds = {
  click: new Audio(),
  walk: new Audio(),
  kill: new Audio(),
  meeting: new Audio(),
  task: new Audio(),
  ambient: new Audio()
};

// =========================
// LOAD SOUNDS (placeholders)
// =========================

// You can replace these later with real files in /assets/sounds/
function initAudio() {
  sounds.click.src = "";
  sounds.walk.src = "";
  sounds.kill.src = "";
  sounds.meeting.src = "";
  sounds.task.src = "";
  sounds.ambient.src = "";

  sounds.ambient.loop = true;
}

// =========================
// PLAY SOUND
// =========================

function playSound(name, volume = 1) {
  if (!sounds[name]) return;

  const s = sounds[name];

  try {
    s.volume = volume * (settings?.volume ?? 50) / 100;
    s.currentTime = 0;
    s.play();
  } catch (e) {
    console.log("Audio blocked or missing:", name);
  }
}

// =========================
// GAME SOUND EVENTS
// =========================

function playClick() {
  playSound("click", 0.5);
}

function playKill() {
  playSound("kill", 1);
}

function playMeeting() {
  playSound("meeting", 0.8);
}

function playTask() {
  playSound("task", 0.6);
}

function startAmbient() {
  playSound("ambient", 0.3);
}

// =========================
// AUTO INIT
// =========================

initAudio();

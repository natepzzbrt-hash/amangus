// =========================
// CORE GAME INTEGRATION PATCH
// =========================

// IMPORTANT: this connects ALL systems together

let gameConfig = {
  practice: false,
  role: "crewmate",
  bots: 5
};

// =========================
// FIXED GAME INIT (REPLACES OLD LOGIC)
// =========================

function initGame(config = {}) {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gameConfig = {
    practice: config.practice || false,
    role: config.role || "crewmate",
    bots: config.bots || 5
  };

  // create player (from player.js)
  createPlayer(canvas.width / 2, canvas.height / 2, gameConfig.role);

  // spawn AI bots (from ai.js)
  spawnBots(gameConfig.bots, canvas);

  // spawn tasks (from tasks.js)
  spawnTasks(canvas);

  // start loop
  requestAnimationFrame(() => gameLoop(canvas, ctx));
}

// =========================
// MAIN GAME LOOP (FIXED)
// =========================

function gameLoop(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background fade
  ctx.fillStyle = "rgba(0,0,20,0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // update player
  if (mainPlayer) {
    mainPlayer.update(keys, canvas);
    mainPlayer.draw(ctx);
  }

  // update bots (AI system)
  updateBotsAI(canvas, mainPlayer);
  drawBotsAI(ctx);

  // update tasks
  if (typeof updateTasks === "function") {
    updateTasks(mainPlayer);
    drawTasks(ctx);
  }

  // meeting system
  if (typeof updateMeeting === "function") {
    updateMeeting();
  }

  // win condition
  if (typeof allTasksComplete === "function" && allTasksComplete()) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("CREWMATES WIN!", canvas.width / 2 - 150, canvas.height / 2);
    return;
  }

  requestAnimationFrame(() => gameLoop(canvas, ctx));
}

// =========================
// EMERGENCY MEETING KEY
// =========================

window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "r") {
    if (mainPlayer && botList.length > 0) {
      startMeeting(mainPlayer, botList);
      if (typeof playMeeting === "function") playMeeting();
    }
  }
});

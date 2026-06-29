let canvas, ctx;

let gameState = {
  running: false,
  practice: false,
  role: "crewmate",
  bots: 0
};

let player = {
  x: 300,
  y: 300,
  size: 18,
  speed: 3,
  color: "#4fc3f7"
};

let keys = {};

// =========================
// INIT GAME
// =========================

function initGame(config = {}) {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gameState.running = true;
  gameState.practice = config.practice || false;
  gameState.role = config.role || "crewmate";
  gameState.bots = config.bots || 0;

  player.x = canvas.width / 2;
  player.y = canvas.height / 2;

  spawnBots(gameState.bots);

  requestAnimationFrame(gameLoop);
}

// =========================
// BOT SYSTEM (BASIC AI PLACEHOLDER)
// =========================

let bots = [];

function spawnBots(count) {
  bots = [];

  for (let i = 0; i < count; i++) {
    bots.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 16,
      color: "red",
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    });
  }
}

// =========================
// INPUT
// =========================

window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

// =========================
// UPDATE PLAYER
// =========================

function updatePlayer() {
  if (keys["w"] || keys["arrowup"]) player.y -= player.speed;
  if (keys["s"] || keys["arrowdown"]) player.y += player.speed;
  if (keys["a"] || keys["arrowleft"]) player.x -= player.speed;
  if (keys["d"] || keys["arrowright"]) player.x += player.speed;

  // boundaries
  player.x = Math.max(0, Math.min(canvas.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height, player.y));
}

// =========================
// UPDATE BOTS
// =========================

function updateBots() {
  bots.forEach(b => {
    b.x += b.vx;
    b.y += b.vy;

    if (b.x < 0 || b.x > canvas.width) b.vx *= -1;
    if (b.y < 0 || b.y > canvas.height) b.vy *= -1;
  });
}

// =========================
// DRAW
// =========================

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fill();
}

function drawBots() {
  bots.forEach(b => {
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

// =========================
// GAME LOOP
// =========================

function gameLoop() {
  if (!gameState.running) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();
  updateBots();

  drawPlayer();
  drawBots();

  requestAnimationFrame(gameLoop);
}

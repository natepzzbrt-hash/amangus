const menu = document.getElementById("menu");
const practiceMenu = document.getElementById("practiceMenu");
const settingsMenu = document.getElementById("settingsMenu");
const game = document.getElementById("game");

const roleText = document.getElementById("roleText");

// =========================
// MENU NAVIGATION
// =========================

function showOnly(screen) {
  menu.classList.add("hidden");
  practiceMenu.classList.add("hidden");
  settingsMenu.classList.add("hidden");
  game.classList.add("hidden");

  screen.classList.remove("hidden");
}

// =========================
// MAIN MENU BUTTONS
// =========================

function startGame() {
  showOnly(game);
  roleText.innerText = "Mode: Free Play";
  console.log("Game started");
  initGame();
}

function openPractice() {
  showOnly(practiceMenu);
}

function openSettings() {
  showOnly(settingsMenu);
}

function backMenu() {
  showOnly(menu);
}

// =========================
// PRACTICE MODE START
// =========================

function startPractice() {
  const role = document.getElementById("roleSelect").value;
  const bots = parseInt(document.getElementById("botCount").value);

  showOnly(game);

  roleText.innerText = `Practice Mode | Role: ${role} | Bots: ${bots}`;

  console.log("Practice started:", role, bots);

  initGame({
    practice: true,
    role: role,
    bots: bots
  });
}

// =========================
// SIMPLE SPACE BACKGROUND
// =========================

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    speed: Math.random() * 0.5 + 0.2
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";

  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    s.y += s.speed;

    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawStars);
}

drawStars();

// =========================
// RESIZE FIX
// =========================

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

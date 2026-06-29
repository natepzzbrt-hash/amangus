// =========================
// PLAYER SYSTEM (UPGRADED)
// =========================

class Player {
  constructor(x, y, role = "crewmate") {
    this.x = x;
    this.y = y;

    this.size = 18;
    this.speed = 3;

    this.role = role;

    this.color = this.getRoleColor(role);

    this.cooldowns = {
      kill: 0
    };
  }

  getRoleColor(role) {
    switch (role) {
      case "impostor": return "#ff3b30";
      case "engineer": return "#34c759";
      case "scientist": return "#5ac8fa";
      case "guardian": return "#af52de";
      default: return "#4fc3f7";
    }
  }

  update(keys, canvas) {
    if (keys["w"] || keys["arrowup"]) this.y -= this.speed;
    if (keys["s"] || keys["arrowdown"]) this.y += this.speed;
    if (keys["a"] || keys["arrowleft"]) this.x -= this.speed;
    if (keys["d"] || keys["arrowright"]) this.x += this.speed;

    // boundaries
    this.x = Math.max(0, Math.min(canvas.width, this.x));
    this.y = Math.max(0, Math.min(canvas.height, this.y));

    // cooldown tick
    if (this.cooldowns.kill > 0) this.cooldowns.kill--;
  }

  draw(ctx) {
    // body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    // visor
    ctx.fillStyle = "#bfefff";
    ctx.beginPath();
    ctx.arc(this.x + 5, this.y - 3, 6, 0, Math.PI * 2);
    ctx.fill();

    // outline
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  canKill() {
    return this.role === "impostor" && this.cooldowns.kill === 0;
  }

  killCooldown() {
    this.cooldowns.kill = 120; // ~2 seconds at 60fps (placeholder)
  }
}

// =========================
// GLOBAL PLAYER INSTANCE
// =========================

let mainPlayer = null;

// create player from game.js
function createPlayer(x, y, role) {
  mainPlayer = new Player(x, y, role);
  return mainPlayer;
}

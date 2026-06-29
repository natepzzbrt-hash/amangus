// =========================
// AI SYSTEM (BASIC BUT EXPANDABLE)
// =========================

class Bot {
  constructor(x, y, role = "crewmate") {
    this.x = x;
    this.y = y;

    this.size = 16;
    this.speed = 1.2;

    this.role = role;
    this.color = this.getColor(role);

    // wandering behavior
    this.targetX = x;
    this.targetY = y;

    this.changeTargetTimer = Math.floor(Math.random() * 120);

    // impostor logic
    this.killCooldown = 0;
  }

  getColor(role) {
    switch (role) {
      case "impostor": return "#ff3b30";
      case "engineer": return "#34c759";
      case "scientist": return "#5ac8fa";
      default: return "#ffcc00";
    }
  }

  update(canvas, player) {
    this.changeTargetTimer--;

    // pick new random target occasionally
    if (this.changeTargetTimer <= 0) {
      this.targetX = Math.random() * canvas.width;
      this.targetY = Math.random() * canvas.height;
      this.changeTargetTimer = 60 + Math.random() * 120;
    }

    // movement toward target
    let dx = this.targetX - this.x;
    let dy = this.targetY - this.y;

    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 1) {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }

    // impostor behavior (simple chase if close)
    if (this.role === "impostor") {
      let pdx = player.x - this.x;
      let pdy = player.y - this.y;
      let pDist = Math.sqrt(pdx * pdx + pdy * pdy);

      if (pDist < 120 && this.killCooldown === 0) {
        // "chase" player
        this.x += (pdx / pDist) * 1.8;
        this.y += (pdy / pDist) * 1.8;
      }

      if (this.killCooldown > 0) {
        this.killCooldown--;
      }
    }
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
    ctx.arc(this.x + 4, this.y - 2, 5, 0, Math.PI * 2);
    ctx.fill();

    // outline
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// =========================
// GLOBAL BOT LIST
// =========================

let botList = [];

// spawn bots
function spawnBots(count, canvas) {
  botList = [];

  for (let i = 0; i < count; i++) {
    let roles = ["crewmate", "crewmate", "crewmate", "engineer", "scientist", "impostor"];

    let role = roles[Math.floor(Math.random() * roles.length)];

    botList.push(
      new Bot(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        role
      )
    );
  }
}

// update bots
function updateBotsAI(canvas, player) {
  botList.forEach(b => b.update(canvas, player));
}

// draw bots
function drawBotsAI(ctx) {
  botList.forEach(b => b.draw(ctx));
}

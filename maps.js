// =========================
// SIMPLE MAP SYSTEM
// =========================

let currentMap = null;

// basic rectangle walls
class Wall {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(ctx) {
    ctx.fillStyle = "#222";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  collides(player) {
    return (
      player.x < this.x + this.w &&
      player.x + player.size > this.x &&
      player.y < this.y + this.h &&
      player.y + player.size > this.y
    );
  }
}

let walls = [];

// =========================
// LOAD MAPS
// =========================

function loadMap(name, canvas) {
  walls = [];

  if (name === "space_station") {
    walls.push(new Wall(200, 150, 400, 30));
    walls.push(new Wall(200, 150, 30, 300));
    walls.push(new Wall(600, 150, 30, 300));
    walls.push(new Wall(200, 450, 430, 30));
  }

  if (name === "lava_core") {
    walls.push(new Wall(100, 100, 500, 40));
    walls.push(new Wall(100, 100, 40, 400));
    walls.push(new Wall(560, 100, 40, 400));
    walls.push(new Wall(100, 500, 500, 40));
  }

  currentMap = name;
}

// =========================
// DRAW MAP
// =========================

function drawMap(ctx) {
  walls.forEach(w => w.draw(ctx));
}

// =========================
// COLLISION BLOCKING
// =========================

function applyCollisions(player) {
  walls.forEach(w => {
    if (w.collides(player)) {
      // simple push-back
      if (player.x < w.x) player.x -= 5;
      if (player.x > w.x) player.x += 5;
      if (player.y < w.y) player.y -= 5;
      if (player.y > w.y) player.y += 5;
    }
  });
}

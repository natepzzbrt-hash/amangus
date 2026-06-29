// =========================
// TASK SYSTEM
// =========================

class Task {
  constructor(x, y, type = "wire") {
    this.x = x;
    this.y = y;
    this.type = type;

    this.size = 20;
    this.completed = false;
    this.progress = 0;
  }

  draw(ctx) {
    if (this.completed) return;

    // task marker
    ctx.fillStyle = "#00ffcc";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.font = "10px Arial";
    ctx.fillText(this.type, this.x - 15, this.y - 25);
  }

  checkPlayer(player) {
    if (this.completed) return;

    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 30) {
      this.progress += 1;

      if (this.progress > 100) {
        this.completed = true;
      }
    }
  }
}

// =========================
// TASK LIST
// =========================

let taskList = [];

// create tasks for map
function spawnTasks(canvas) {
  taskList = [];

  let types = ["wire", "scan", "fuel", "align", "download"];

  for (let i = 0; i < 8; i++) {
    taskList.push(
      new Task(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        types[Math.floor(Math.random() * types.length)]
      )
    );
  }
}

// update tasks
function updateTasks(player) {
  taskList.forEach(t => t.checkPlayer(player));
}

// draw tasks
function drawTasks(ctx) {
  taskList.forEach(t => t.draw(ctx));
}

// check win condition
function allTasksComplete() {
  return taskList.length > 0 && taskList.every(t => t.completed);
}

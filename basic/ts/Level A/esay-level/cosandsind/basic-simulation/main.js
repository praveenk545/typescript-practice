const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let cx = () => canvas.width / 2;
let cy = () => canvas.height / 2;

// =====================
// SPACETIME GRID
// =====================
function drawSpacetime() {
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;

  const spacing = 40;

  for (let x = 0; x < canvas.width; x += spacing) {
    ctx.beginPath();
    for (let y = 0; y < canvas.height; y += 10) {
      const dx = x - cx();
      const dy = y - cy();
      const dist = Math.sqrt(dx * dx + dy * dy);
      const warp = 15000 / (dist * dist + 2000);

      ctx.lineTo(x + dx * warp * 0.001, y + dy * warp * 0.001);
    }
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += spacing) {
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 10) {
      const dx = x - cx();
      const dy = y - cy();
      const dist = Math.sqrt(dx * dx + dy * dy);
      const warp = 15000 / (dist * dist + 2000);

      ctx.lineTo(x + dx * warp * 0.001, y + dy * warp * 0.001);
    }
    ctx.stroke();
  }
}

// =====================
// LIGHT PARTICLES
// =====================
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * 600 + 200;
    this.speed = Math.random() * 0.03 + 0.01;
    this.size = Math.random() * 2 + 0.5;
  }

  update() {
    this.speed += 0.0003;     // frame dragging
    this.angle += this.speed;
    this.radius *= 0.987;     // gravity

    if (this.radius < 60) this.reset();
  }

  draw() {
    const x = cx() + Math.cos(this.angle) * this.radius;
    const y = cy() + Math.sin(this.angle) * this.radius;

    const glow = Math.max(0, 1 - this.radius / 500);

    ctx.fillStyle = `rgba(255,255,255,${glow})`;
    ctx.beginPath();
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = [];
for (let i = 0; i < 1200; i++) {
  particles.push(new Particle());
}

// =====================
// BLACK HOLE + DISK
// =====================
function drawBlackHole() {
  // accretion disk
  const disk = ctx.createRadialGradient(cx(), cy(), 80, cx(), cy(), 180);
  disk.addColorStop(0, "transparent");
  disk.addColorStop(0.5, "orange");
  disk.addColorStop(1, "transparent");

  ctx.fillStyle = disk;
  ctx.beginPath();
  ctx.arc(cx(), cy(), 180, 0, Math.PI * 2);
  ctx.fill();

  // event horizon
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(cx(), cy(), 60, 0, Math.PI * 2);
  ctx.fill();
}

// =====================
// ANIMATION LOOP
// =====================
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawSpacetime();

  for (let p of particles) {
    p.update();
    p.draw();
  }

  drawBlackHole();

  requestAnimationFrame(animate);
}

animate();

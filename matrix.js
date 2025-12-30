console.log("matrix.js carregou");

let FALL_DELAY = 40;

const FONT_SIZE = 16;
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャラワン".split("");
const BACKGROUND_ALPHA = 0.03;
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

let width, height, columns;
let drops = [];

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  columns = Math.floor(width / FONT_SIZE);
  drops = Array(columns).fill(0);
}

function drawBackground() {
  ctx.fillStyle = `rgba(0, 0, 0, ${BACKGROUND_ALPHA})`;
  ctx.fillRect(0, 0, width, height);
}

const SPEED = 0.5;

function drawMatrix() {
  ctx.fillStyle = "#00ff00";
  ctx.font = `${FONT_SIZE}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    const x = i * FONT_SIZE;
    const y = drops[i] * FONT_SIZE;

    ctx.fillText(text, x, y);

    if (y > height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

function animate() {
  drawBackground();
  drawMatrix();
  requestAnimationFrame(animate);
}

window.addEventListener("click", () => {
  FALL_DELAY = FALL_DELAY === 40 ? 15 : 70;
});


resizeCanvas();
animate();

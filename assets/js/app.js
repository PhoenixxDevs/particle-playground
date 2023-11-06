import { particleCreate, particlesUpdate } from "./particle.js";

const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
const buttons = document.getElementById("container");
const startButton = document.getElementById("go");
const clear = document.getElementById("clear");

export const mouse = {
  pos: {
    x: 0,
    y: 0,
  },
};

export let WIDTH, HEIGHT;
export let WIDTH_HALF, HEIGHT_HALF;
export let particles = [];

let mode = null;
let amount = 0;
let running = false;

function init() {
  mode = null;
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  WIDTH_HALF = WIDTH / 2;
  HEIGHT_HALF = HEIGHT / 2;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
}

function start() {
  particleCreate(mode, amount);

  if (!running) {
    running = true;
    animate();
  }
}

function stop() {
  particles = [];
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  running = false;
  for (let i = 0; i < particles.length; i++) {
    particles.pop();
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  if (!running) {
    return;
  }
  particlesUpdate();

  window.requestAnimationFrame(animate);
}

startButton.addEventListener("click", start);
clear.addEventListener("click", stop);
buttons.children[0].addEventListener("click", () => {
  mode = "default";
  amount = 30;
});
buttons.children[1].addEventListener("click", () => {
  mode = "bubble";
  amount = 30;
});
buttons.children[2].addEventListener("click", () => {
  mode = "mouseSpark";
  amount = 2;
  if (!running) {
    running = true;
    animate();
  }
});
buttons.children[3].addEventListener("click", () => {
  mode = "firework";
  amount = 15;
});
window.addEventListener("mousemove", (e) => {
  mouse.pos.x = e.pageX;
  mouse.pos.y = e.pageY;

  if (mode === "mouseSpark" && running) {
    particleCreate(mode, amount);
  }
});
window.addEventListener("mousedown", () => {
  if (mode === "firework") {
    start();
  }
});
window.addEventListener("resize", init);
window.addEventListener("DOMContentLoaded", init);

import { particleCreate, particles, particlesUpdate } from "./particle.js";

const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext('2d');

export let WIDTH, HEIGHT;
export let WIDTH_HALF, HEIGHT_HALF;

function init(){
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  WIDTH_HALF = WIDTH / 2;
  HEIGHT_HALF = HEIGHT / 2;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  particleCreate('default', 30, false);

  animate();
}

function animate(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  particlesUpdate();

  window.requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', init);
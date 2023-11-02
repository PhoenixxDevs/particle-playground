const canvas = document.createElement('canvas');
export const ctx = canvas.getContext('2d');

export let WIDTH, HEIGHT;
export let WIDTH_HALF, HEIGHT_HALF;

function init(){
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  WIDTH_HALF = WIDTH / 2;
  HEIGHT_HALF = HEIGHT / 2;

  animate();
}

function animate(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  window.requestAnimationFrame(animate);
}
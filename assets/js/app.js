import { particleCreate, particlesUpdate } from "./particle.js";

const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext('2d');
const buttons = document.getElementById('container');
const startButton = document.getElementById('go');
const clear = document.getElementById('clear');

export let WIDTH, HEIGHT;
export let WIDTH_HALF, HEIGHT_HALF;
export let particles = [];

let mode = null;
let running = false;

function pickMode(){
  for(let i=0; i<buttons.children.length; i++) {
    if(buttons.children[i].classList.length > 2){
      mode = buttons.children[i].id;
      return mode;
    }
  }
}

function init(){
  mode = null;
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  WIDTH_HALF = WIDTH / 2;
  HEIGHT_HALF = HEIGHT / 2;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  console.log(pickMode())

  particleCreate( pickMode(), 30, false );

  if(!running){running = true; animate();}
}

function stop(){
  particles = [];

  running = false;
}

function animate(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  if(!running){return}
  particlesUpdate();

  window.requestAnimationFrame(animate);
}

go.addEventListener('click', init);
clear.addEventListener('click', stop);
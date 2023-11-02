import { ctx, WIDTH, HEIGHT, WIDTH_HALF, HEIGHT_HALF } from 'app.js';

export let particles = [];
let particlesLength = 0;

class Particle {
  constructor(config) {
    this.type = config.type;
    this.size = config.size;
    this.pos = config.pos;
    this.vel = config.vel;
    this.color = config.color;
    this.remove = false;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.draw();
  }
}

export function createParticle(type, amount, clear){
  if(clear){particles = [];}
  let config = {};
  let size = 0;

  for(let i = 0; i < amount; i++){
    switch(type){
      case 'default': default: 
        size = Math.floor(Math.random() * 10) + 4;
        config = {
          size: size,
          pos: {
            x: Math.floor(
              (size) + Math.random() * WIDTH - (size * 2)
            ),
            y: Math.floor(
              (size) + Math.random() * WIDTH - (size * 2)
            )
          },
          vel: {
            x: ((100 * Math.floor(Math.random() * 3)) - 1.5) / 100,
            y: ((100 * Math.floor(Math.random() * 3)) - 1.5) / 100
          },
          color: `hsl(${Math.floor(Math.random() * 80 + 170)}, 70%, 60%)`
        };
      break;
    }

    particles.push(new Particle(config));
  }
}

export function particlesUpdate(){
  particlesLength = particles.length;
  for(let i = 0; i < particlesLength; i++){
    particles[i].update();
    if(particles[i].remove){
      particles.splice(i, 1);
      particlesLength = particles.length;
    }
  }
};
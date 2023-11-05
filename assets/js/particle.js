import { ctx, WIDTH, HEIGHT, WIDTH_HALF, HEIGHT_HALF, particles } from './app.js';

let particlesLength = 0;

class Particle {
  constructor(config) {
    this.type = config.type;
    this.size = config.size;
    this.pos = config.pos;
    this.vel = config.vel;
    this.color = config.color;
    this.remove = false;

    this.sizeModifier = config.sizeModifier;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // PARTICLE CONTROL METHODS
  move(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  contain(){
    if(this.pos.x < this.size){
      this.pos.x = this.size;
      this.vel.x *= -1;
    }
    else if (this.pos.x > WIDTH - this.size){
      this.pos.x = WIDTH - this.size;
      this.vel.x *= -1;
    }
    if(this.pos.y < this.size){
      this.pos.y = this.size;
      this.vel.y *= -1;
    }
    else if (this.pos.y > HEIGHT - this.size){
      this.pos.y = HEIGHT - this.size;
      this.vel.y *= -1;
    }
  }
  sizeMod(){
    this.size += this.sizeModifier;
  }
  removeOffScreen(){
    if( this.pos.x < -this.size ||
      this.pos.x > WIDTH + this.size ||
      this.pos.y < -this.size ||
      this.pos.y > HEIGHT + this.size){ 
        this.remove = true;
    }
  }

  // TYPE FUNCTIONALITY
  default(){
    this.move();
    this.contain();
  }
  bubble(){
    this.move();
    this.sizeMod();
    this.removeOffScreen();
  }


  update() {

    switch(this.type) {
      case 'default':
        this.default();
      break;
      
      case 'bubble':
        this.bubble();
      break;
    }

    this.draw();
  }
}

// CREATION FUNCTION


export function particleCreate(type, amount){
  let config = {};
  let size = 0;

  for(let i = 0; i < amount; i++){
    switch(type){

      // DEFAULT PARTICLE DEFINITIONS
      case 'default': default: 
        size = Math.floor(Math.random() * 10) + 4;
        config = {
          type: 'default',
          size: size,
          pos: {
            x: Math.floor(
              (size) + (Math.random() * WIDTH) - (size * 2)
            ),
            y: Math.floor(
              (size) + (Math.random() * HEIGHT) - (size * 2)
            )
          },
          vel: {
            x: ((100 * Math.floor(Math.random() * 4) - 2)) / 100,
            y: ((100 * Math.floor(Math.random() * 4) - 2)) / 100
          },
          // color: 'white'
          color: `hsl(${Math.floor(Math.random() * 80 + 230)}, 70%, 70%)`
        };
        //MINIMUM PARTICLE SPEED
        if(config.vel.x < 0.2 && config.vel.x > 0){ config.vel.x = 0.2; }
        if(config.vel.x > -0.2 && config.vel.x < 0){ config.vel.x = -0.2; }
        if(config.vel.y < 0.2 && config.vel.y > 0){ config.vel.y = 0.2; }
        if(config.vel.y > -0.2 && config.vel.y < 0){ config.vel.y = -0.2; }
      break;

      case 'bubble':
        config = {
          type: 'bubble',
          size: Math.floor(Math.random() * 3),
          pos: {x: WIDTH_HALF, y: HEIGHT_HALF},
          vel: {
            x: ((100 * Math.floor(Math.random() * 8))) / 100 - 4,
            y: ((100 * Math.floor(Math.random() * 8))) / 100 - 4
          },
          // color: 'white'
          color: `hsla(${Math.floor(Math.random() * 40 + 170)}, 70%, ${Math.floor(Math.random() * 15) + 70}%, 0.65)`,
          sizeModifier: Math.random() * 0.5 + 0.5
        };
        //MINIMUM PARTICLE SPEED
        if(config.vel.x < 0.3 && config.vel.x > 0){ config.vel.x = 0.3; }
        if(config.vel.x > -0.3 && config.vel.x < 0){ config.vel.x = -0.3; }
        if(config.vel.y < 0.3 && config.vel.y > 0){ config.vel.y = 0.3; }
        if(config.vel.y > -0.3 && config.vel.y < 0){ config.vel.y = -0.3; 
      break;
      }
    }

    particles.push(new Particle(config));
  }
}


// UPDATE FUNCION


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
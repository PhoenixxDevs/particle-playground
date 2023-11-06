import {
  ctx,
  WIDTH,
  HEIGHT,
  WIDTH_HALF,
  HEIGHT_HALF,
  particles,
  mouse,
} from "./app.js";

let particlesLength = 0;

class Particle {
  constructor(config) {
    this.type = config.type;
    this.size = config.size;
    this.weight = config.weight;
    this.pos = config.pos;
    this.vel = config.vel;
    this.color = config.color;
    this.alpha = config.alpha;
    this.remove = false;

    this.sizeModifier = config.sizeModifier;
    this.alphaModifier = config.alphaModifier;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // PARTICLE CONTROL METHODS
  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  gravity() {
    this.vel.y += this.weight;
  }
  contain() {
    if (this.pos.x < this.size) {
      this.pos.x = this.size;
      this.vel.x *= -1;
    } else if (this.pos.x > WIDTH - this.size) {
      this.pos.x = WIDTH - this.size;
      this.vel.x *= -1;
    }
    if (this.pos.y < this.size) {
      this.pos.y = this.size;
      this.vel.y *= -1;
    } else if (this.pos.y > HEIGHT - this.size) {
      this.pos.y = HEIGHT - this.size;
      this.vel.y *= -1;
    }
  }
  sizeMod(max) {
    if (this.size >= max) {
      this.size = max;
      return;
    }
    this.size += this.sizeModifier;
    if (this.size < 0.1) {
      this.size = 0.1;
    }
  }
  alphaMod() {
    this.alpha += this.alphaModifier;
    if (this.alpha <= 0.02) {
      this.remove = true;
    }
  }
  removeOffScreen() {
    if (
      this.pos.x < -this.size ||
      this.pos.x > WIDTH + this.size ||
      this.pos.y < -this.size ||
      this.pos.y > HEIGHT + this.size
    ) {
      this.remove = true;
    }
  }
  removeSmallParticles() {
    if (this.size <= 0.1) {
      this.remove = true;
    }
  }
  removeAtSize(size) {
    if (this.size >= size) {
      this.remove = true;
    }
  }

  // TYPE FUNCTIONALITY
  default() {
    this.move();
    this.contain();
  }
  bubble() {
    this.removeAtSize(WIDTH_HALF * 0.5);
    this.removeOffScreen();
    this.move();
    this.sizeMod();
  }
  mouseSpark() {
    this.removeOffScreen();
    this.gravity();
    this.move();
    this.alphaMod();
    this.sizeMod();
    this.color = `hsla(${Math.random() * 13 + 36}, 93%, 65%, ${this.alpha})`;
  }
  firework() {
    this.removeOffScreen();
    this.gravity();
    this.move();
    this.alphaMod();
    this.sizeMod(6);
    this.color = `hsla(${Math.random() * 40 + 132}, 93%, 67%, ${this.alpha})`;
  }

  update() {
    switch (this.type) {
      case "default":
        this.default();
        break;

      case "bubble":
        this.bubble();
        break;

      case "mouseSpark":
        this.mouseSpark();
        break;

      case "firework":
        this.firework();
        break;
    }

    this.draw();
  }
}

// CREATION FUNCTION

export function particleCreate(type, amount) {
  let config = {};
  let size = 0;
  let alpha = 0;

  for (let i = 0; i < amount; i++) {
    switch (type) {
      // DEFAULT PARTICLE DEFINITIONS
      case "default":
      default:
        size = Math.floor(Math.random() * 10) + 4;
        config = {
          type: "default",
          size: size,
          pos: {
            x: Math.floor(size + Math.random() * WIDTH - size * 2),
            y: Math.floor(size + Math.random() * HEIGHT - size * 2),
          },
          vel: {
            x: (100 * Math.floor(Math.random() * 4) - 2) / 100,
            y: (100 * Math.floor(Math.random() * 4) - 2) / 100,
          },
          // color: 'white'
          color: `hsl(${Math.floor(Math.random() * 80 + 230)}, 70%, 70%)`,
        };
        //MINIMUM PARTICLE SPEED
        if (config.vel.x < 0.2 && config.vel.x > 0) {
          config.vel.x = 0.2;
        }
        if (config.vel.x > -0.2 && config.vel.x < 0) {
          config.vel.x = -0.2;
        }
        if (config.vel.y < 0.2 && config.vel.y > 0) {
          config.vel.y = 0.2;
        }
        if (config.vel.y > -0.2 && config.vel.y < 0) {
          config.vel.y = -0.2;
        }
        break;

      //BUBBLE DEFINITIONS
      case "bubble":
        size = Math.floor(Math.random() * 3);
        config = {
          type: "bubble",
          size: size,
          pos: {
            x: size + Math.floor(Math.random() * WIDTH) - size * 2,
            y: HEIGHT - size,
          },
          vel: {
            x: (100 * Math.floor(Math.random() * 8)) / 100 - 4,
            y: (100 * Math.floor(Math.random() * 8)) / 100 - 4,
          },
          // color: 'white'
          color: `hsla(${Math.floor(Math.random() * 40 + 170)}, 70%, ${
            Math.floor(Math.random() * 15) + 70
          }%, 0.65)`,
          sizeModifier: Math.random() * 0.5 + 0.5,
        };
        //MINIMUM PARTICLE SPEED
        if (config.vel.x < 0.3 && config.vel.x > 0) {
          config.vel.x = 0.3;
        }
        if (config.vel.x > -0.3 && config.vel.x < 0) {
          config.vel.x = -0.3;
        }
        if (config.vel.y < 0.3 && config.vel.y > 0) {
          config.vel.y = 0.3;
        }
        if (config.vel.y > -0.3 && config.vel.y < 0) {
          config.vel.y = -0.3;
        }
        break;

      //MOUSESPARKS DEFINITIONS
      case "mouseSpark":
        alpha = Math.random() * 0.2 + 0.8;
        size = Math.random() * 3 + 1;
        config = {
          type: "mouseSpark",
          size: size,
          weight: size / 25,
          pos: { x: mouse.pos.x, y: mouse.pos.y },
          vel: {
            x: Math.random() * 8 - 4,
            y: Math.random() * 4 - 2,
          },
          color: `hsla(${Math.random() * 17 + 32}, 93%, 67%, ${alpha})`,
          alpha: alpha,
          sizeModifier: Math.random() * -0.003,
          alphaModifier: Math.random() * -0.23,
        };
        break;

      //FIREWORKS DEFINITIONS
      case "firework":
        size = Math.random() * 2 + 1;
        config = {
          type: "firework",
          size: size,
          weight: size / 20,
          pos: { x: mouse.pos.x, y: mouse.pos.y },
          vel: {
            x: Math.random() * 4 - 2,
            y: Math.random() * -3 - 2,
          },
          color: `hsla(${Math.random() * 40 + 132}, 93%, 67%, ${alpha})`,
          alpha: 0.05,
          sizeModifier: Math.random() * 0.004,
          alphaModifier: Math.random() * 0.1,
        };
        break;
    }

    particles.push(new Particle(config));
  }
}

// UPDATE FUNCION

export function particlesUpdate() {
  particlesLength = particles.length;
  for (let i = 0; i < particlesLength; i++) {
    particles[i].update();
    if (particles[i].remove) {
      particles.splice(i, 1);
      particlesLength = particles.length;
    }
  }
}

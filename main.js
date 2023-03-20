const cnv = document.getElementById("cnv");
const ctx = cnv.getContext("2d");
cnv.width = 500;
cnv.height = 500;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

document.addEventListener("keydown", move);
document.addEventListener("mousemove", mouseMove);

class slope {
  constructor(a, p) {
    this.a = a;
    this.p = p;
  }
  display() {
    // ctx.beginPath();
    // ctx.moveTo(0, cnv.height / 2);
    // for (let x = 0; x < cnv.width; x++) {
    //   ctx.lineTo(x, cnv.height / 2 + Math.cos(x * this.p) * this.a);
    // }
    // ctx.stroke();
  }
}

class ball {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.v = 0
    this.xv = 0;
    this.yv = 0;
    this.angle = angle;
    this.colliding = false;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.fill();
  }

  determineAngle() {
    if (this.colliding) {
      let nextY = cnv.height / 2;
      for (let i = 0; i < waves.length; i++) {
        nextY += Math.sin(waves[i].p * (this.x + mapX + 1)) * waves[i].a;
      }
      this.angle = Math.atan(nextY - this.y);
      console.log(this.angle * 180 / Math.PI)
    }     
  }

  move() {
    this.checkCollision();
    this.determineAngle();

    const gravity = Math.sin(this.angle) * 0.5;
    if(this.colliding) {
      this.xv += Math.cos(this.angle) * gravity
      this.yv += Math.sin(this.angle) * gravity
    } else {
      this.yv += gravity
    }

    this.x += this.xv;
    this.y += this.yv;

    this.draw();
  }

  checkCollision() {
    this.colliding = false;
    let sum = 0;
    for (let i = 0; i < waves.length; i++) {
      sum += Math.sin(waves[i].p * (this.x + mapX)) * waves[i].a;
    }
    if (sum + cnv.height / 2 - this.y < 0) {
      this.colliding = true;
      this.y = sum + cnv.height / 2;
    }
  }
}

let waves = [];

function createWaves() {
  for (let i = 0; i < 20; i++) {
    const randA = random(5, 10);
    const randP = random(0.01, 0.05);
    waves.push(new slope(randA, randP));
  }
}

createWaves();

waves = [new slope(0, 0)]
//test
let mapX = 0;

function move(event) {
  if (event.key == "ArrowRight") {
    mapX += 10;
  }
}

let Ball = new ball(300, 50, Math.PI / 2);

requestAnimationFrame(loop);
function loop() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.beginPath();
  ctx.moveTo(0, cnv.height / 2);
  for (let x = mapX; x < cnv.width + mapX; x++) {
    let y = cnv.height / 2;
    for (let i = 0; i < waves.length; i++) {
      y += Math.sin(x * waves[i].p) * waves[i].a;
    }
    ctx.lineTo(x - mapX, y);
  }
  ctx.strokeSyle = "black";
  ctx.stroke();
  Ball.move();
  requestAnimationFrame(loop);
}

let mouse = {
  x: 0,
  y: 0,
};

function mouseMove(event) {
  mouse.x = event.x;
  mouse.y = event.y;
}

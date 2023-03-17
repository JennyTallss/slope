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
  constructor(x, y, a, v, angle) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.v = v;
    this.angle = angle;
    this.colliding = false;
  }
  draw() {
    // ctx.fillStyle = "red";
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    // ctx.fill();
  }
  determineAngle() {
    if (this.colliding) {
      let nextY = cnv.height / 2;
      for (let i = 0; i < waves.length; i++) {
        nextY += Math.sin(waves[i].p * (this.x + mapX + 1)) * waves[i].a;
      }
      this.angle = Math.atan((nextY - this.y) / (this.x + 1 - this.x));
    // } else {
    //   this.angle = (Math.PI) / 2;
    }     
  }
  move() {
    const gravity = Math.sin(this.angle) * 0.05;
    this.v += gravity;
    // console.log(this.v);
    this.x += Math.cos(this.angle) * this.v;
    this.y += Math.sin(this.angle) * this.v;
    // console.log(Math.sin(this.angle) * this.v)
    console.log(gravity)
    // this.x += 1;
    // this.y += 5;
    this.checkCollision();
    this.determineAngle();
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.fill();
  }
  checkCollision() {
    // this.colliding = false;
    let sum = 0;
    for (let i = 0; i < waves.length; i++) {
      sum += Math.sin(waves[i].p * (this.x + mapX)) * waves[i].a;
    }
    // if (sum + cnv.height / 2 - this.y < 0) {
      this.colliding = true;
      this.y = sum + cnv.height / 2;
    // }
  }
}

const waves = [];

function createWaves() {
  for (let i = 0; i < 20; i++) {
    const randA = random(5, 10);
    const randP = random(0.01, 0.05);
    waves.push(new slope(randA, randP));
  }
}

createWaves();
//test
let mapX = 0;

function move(event) {
  if (event.key == "ArrowRight") {
    mapX += 10;
  }
}

let Ball = new ball(300, 50, 50, 0, (3 * Math.PI) / 2);

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
  Ball.draw();
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

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
    ctx.beginPath();
    ctx.moveTo(0, cnv.height / 2);
    for (let x = 0; x < cnv.width; x++) {
      ctx.lineTo(x, cnv.height / 2 + Math.cos(x * this.p) * this.a);
    }
    ctx.stroke();
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

let mapX = 0;

function move(event) {
  if (event.key == "ArrowRight") {
    mapX += 10;
  }
}

requestAnimationFrame(loop);
function loop() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.beginPath();
  ctx.moveTo(0, cnv.height / 2);
  for (let x = mapX; x < cnv.width + mapX; x++) {
    let y = cnv.height / 2;
    //cycles through waves to add y values
    for (let i = 0; i < waves.length; i++) {
      //y values are added together
      y += Math.sin(x * waves[i].p) * waves[i].a;
    }
    ctx.lineTo(x - mapX, y);
  }
  ctx.strokeSyle = "black";
  ctx.stroke();
  checkCollision();
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

function checkCollision() {
  let sum = 0;
  for (let i = 0; i < waves.length; i++) {
    sum += Math.sin(waves[i].p * (mouse.x + mapX)) * waves[i].a;
  }
  let inside = false;
  4;
  if (sum + cnv.height / 2 - mouse.y < 0) {
    inside = true;
  }
  ctx.fillStyle = "green";
  if (!inside) {
    ctx.fillRect(mouse.x, mouse.y, 5, 5);
  } else {
    ctx.fillRect(mouse.x, sum + cnv.height / 2, 5, 5);
  }
}

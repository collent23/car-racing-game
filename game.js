
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const car = new Image();
car.src = "car.png";

const road = new Image();
road.src = "road.png";

const enemyCar = new Image();
enemyCar.src = "enemy.png";

let carX = 150;
let carY = 500;
let enemyX = Math.random() * 280;
let enemyY = -100;
let speed = 3;
let score = 0;

function draw() {
  ctx.drawImage(road, 0, 0, canvas.width, canvas.height);

  ctx.drawImage(car, carX, carY, 60, 100);
  ctx.drawImage(enemyCar, enemyX, enemyY, 60, 100);

  enemyY += speed;
  if (enemyY > canvas.height) {
    enemyY = -100;
    enemyX = Math.random() * 280;
    score++;
  }

  // tabrakan
  if (
    carX < enemyX + 60 &&
    carX + 60 > enemyX &&
    carY < enemyY + 100 &&
    carY + 100 > enemyY
  ) {
    alert("Game Over! Skor: " + score);
    document.location.reload();
  }

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && carX > 0) carX -= 10;
  if (e.key === "ArrowRight" && carX < 300) carX += 10;
});

document.getElementById("leftBtn").addEventListener("touchstart", () => {
  if (carX > 0) carX -= 10;
});
document.getElementById("rightBtn").addEventListener("touchstart", () => {
  if (carX < 300) carX += 10;
});

draw();

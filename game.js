
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const car = new Image();
car.src = "car.png";
const road = new Image();
road.src = "road.png";
const enemyCar = new Image();
enemyCar.src = "enemy.png";

const bgm = document.getElementById("bgm");
const crashSound = document.getElementById("crash");
const startSound = document.getElementById("start");

let carX = 150;
let carY = 500;
let enemyX = Math.random() * 280;
let enemyY = -100;
let speed = 4;
let score = 0;
let gameOver = false;

function draw() {
  ctx.drawImage(road, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(car, carX, carY, 60, 100);
  ctx.drawImage(enemyCar, enemyX, enemyY, 60, 100);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  if (!gameOver) {
    enemyY += speed;
    if (enemyY > canvas.height) {
      enemyY = -100;
      enemyX = Math.random() * 280;
      score++;
    }

    if (
      carX < enemyX + 60 &&
      carX + 60 > enemyX &&
      carY < enemyY + 100 &&
      carY + 100 > enemyY
    ) {
      gameOver = true;
      crashSound.play();
      setTimeout(() => {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 90, 300);
        ctx.fillText("Score: " + score, 110, 340);
        ctx.fillText("Tap to Restart", 80, 380);
      }, 100);
    } else {
      requestAnimationFrame(draw);
    }
  }
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

canvas.addEventListener("click", () => {
  if (gameOver) document.location.reload();
});

draw();

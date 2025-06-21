const car = document.getElementById("car");
const enemy = document.getElementById("enemyCar");
const scoreDisplay = document.getElementById("score");

const bgm = document.getElementById("bgm");
const crash = document.getElementById("crash");

let score = 0;
let carPosition = 175;
let enemyPosition = 0;
let enemyX = Math.floor(Math.random() * 350);

document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowLeft" && carPosition > 0) {
    carPosition -= 25;
    car.style.left = carPosition + "px";
  }
  if (e.key === "ArrowRight" && carPosition < 350) {
    carPosition += 25;
    car.style.left = carPosition + "px";
  }
});

function moveEnemy() {
  enemyPosition += 5;
  enemy.style.top = enemyPosition + "px";
  enemy.style.left = enemyX + "px";

  if (enemyPosition > 600) {
    enemyPosition = 0;
    enemyX = Math.floor(Math.random() * 350);
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }

  if (
    enemyPosition > 500 &&
    Math.abs(carPosition - enemyX) < 50
  ) {
    crash.play();
    bgm.pause();
    alert("GAME OVER! Score: " + score);
    location.reload();
  }

  requestAnimationFrame(moveEnemy);
}

moveEnemy();

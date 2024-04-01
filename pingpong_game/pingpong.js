



const table = document.getElementById("table");
const ctx = table.getContext("2d");

const ball = {
  x: table.width / 2,
  y: table.height / 2,
  radius: 10,
  velX: 5,
  velY: 5,
  speed: 5,
  color: "green"
};

const user = {
  x: 0,
  y: (table.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "red"
};

const CPU = {
  x: table.width - 10,
  y: (table.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "blue"
};

function drawRectangle(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function drawScore(text, x, y) {
  ctx.fillStyle = "white";
  ctx.font = "60px Arial";
  ctx.fillText(text, x, y);
}

function drawSeparator() {
  for (let i = 0; i <= table.height; i += 20) {
    drawRectangle(table.width / 2 - 1, i, 2, 10, "orange");
  }
}

function draw() {
  drawRectangle(0, 0, table.width, table.height, "black");
  drawScore(user.score, table.width / 4, table.height / 5);
  drawScore(CPU.score, 3 * table.width / 4, table.height / 5);
  drawSeparator();
  drawRectangle(user.x, user.y, user.width, user.height, user.color);
  drawRectangle(CPU.x, CPU.y, CPU.width, CPU.height, CPU.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
const winningScore=4;
function update() {
  ball.x += ball.velX;
  ball.y += ball.velY;

  // Collision with walls
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > table.height) {
    ball.velY = -ball.velY;
  }

  // Collision with user paddle
  if (
    ball.x - ball.radius < user.x + user.width &&
    ball.y > user.y &&
    ball.y < user.y + user.height
  ) {
    ball.velX = -ball.velX;
  }

  // Collision with CPU paddle
  if (
    ball.x + ball.radius > CPU.x &&
    ball.y > CPU.y &&
    ball.y < CPU.y + CPU.height
  ) {
    ball.velX = -ball.velX;
  }

  // Scoring
  if (ball.x - ball.radius < 0) {
    CPU.score++;
    reset();
  } else if (ball.x + ball.radius > table.width) {
    user.score++;
    reset();
  }
  if (user.score === winningScore || CPU.score === winningScore) {
    gameOver();
  }
}
function gameOver() {
  // Display the winner
  let winner = user.score === winningScore ? "You" : "CPU";
  alert(`${winner} wins the game!`);
  resetGame();
}

function resetGame() {
  user.score = 0;
  CPU.score = 0;
  reset();
}

function reset() {
  ball.x = table.width / 2;
  ball.y = table.height / 2;
  ball.velX = -ball.velX;
  ball.speed = 5;
}
function moveCPU() {
    // Simple AI: CPU follows the ball's y-coordinate
    const middlePaddle = CPU.y + CPU.height / 2;
    if (middlePaddle < ball.y - 35) {
      CPU.y += 7;
    } else if (middlePaddle > ball.y + 35) {
      CPU.y -= 7;
    }
  }
function gameLoop() {
    draw();
    update();
    moveCPU(); // Add CPU movement logic
    requestAnimationFrame(gameLoop);
}

table.addEventListener("mousemove", (evt) => {
  let rect = table.getBoundingClientRect();
  user.y = evt.clientY - rect.top - user.height / 2;
});

gameLoop();








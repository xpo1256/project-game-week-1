let border = document.getElementById('border');
let bornSnake = [{x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)}];
let way = {x:0 , y:0};
let ate = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
let score = document.querySelector(".score");
let reset = document.getElementById("reset-btn");
let time = document.querySelector(".timer");
let note = document.querySelector(".note");
let rem = 10;
let isRun = true;
let showover = false;
let isWin = false;
let game;
let timerInterval;

reset.classList.add("hiddenbtn");

document.addEventListener("keyup", function(e) {
  if(way.x === 0 && way.y === 0) {
    if (!timerInterval) {
      timerInterval = setInterval(timing, 1000);
    }
    isRun = true;
    reset.classList.remove("hiddenbtn");
    note.classList.add("hiddenbtn");
  }

  if (e.key === "ArrowUp" && way.y !== 1 && isRun) way = {x:0,y:-1};
  else if (e.key === "ArrowDown" && way.y !== -1 && isRun) way = {x:0,y:1};
  else if (e.key === "ArrowLeft" && way.x !== 1 && isRun) way = {x:-1,y:0};
  else if (e.key === "ArrowRight" && way.x !== -1 && isRun) way = {x:1,y:0};
});

reset.addEventListener("click", function() {
  ate = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
  bornSnake = [{x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)}];
  way = {x:0 , y:0};
  score.innerHTML = "Score: 0";
  showover = false;
  isWin = false;
  isRun = false;
  rem = 10;
  time.innerHTML = "0:10";
  clearInterval(timerInterval);
  timerInterval = null;
  reset.classList.add("hiddenbtn");
  note.classList.remove("hiddenbtn");
  document.querySelector(".GameOver")?.remove();
  document.querySelector(".win")?.remove();
  littleSnake();
  clearInterval(game);
  game = setInterval(() => {
    if (isRun) {
      movingSnake();
      littleSnake();
      gameOver();
      uWin();
    }
  }, 200);
});

function littleSnake() {
  border.innerHTML = "";
  for (let i = 0; i < 400; i++) {
    const block = document.createElement("div");
    block.classList = "block";
    let x = i % 20;
    let y = Math.floor(i/20);
    for (let j = 0; j < bornSnake.length; j++) {
      if (bornSnake[j].x === x && bornSnake[j].y === y) block.className = "snake";
      if (ate.x === x && ate.y === y && !checkFood()) block.className = "food";
    }
    border.appendChild(block);
  }
}

function movingSnake() {
  const head = { x: bornSnake[0].x + way.x, y: bornSnake[0].y + way.y };
  bornSnake.unshift(head);
  if (head.x === ate.x && head.y === ate.y) {
    ate = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
    let value = parseInt(score.innerText.split(":")[1] || 0);
    score.textContent = `Score: ${value + 1}`;
  } else {
    bornSnake.pop();
  }
}

function gameOver() {
  if (bornSnake[0].x < 0 || bornSnake[0].x >= 20 || bornSnake[0].y < 0 || bornSnake[0].y >= 20) {
    isRun = false;
  }
  for (let i = 1; i < bornSnake.length; i++) {
    if (bornSnake[i].x === bornSnake[0].x && bornSnake[i].y === bornSnake[0].y) {
      isRun = false;
      break;
    }
  }

  if (!isRun && !showover) {
    let card = document.createElement("div");
    card.className = "GameOver";
    card.innerText = "Game Over!";
    border.appendChild(card);
    showover = true;
    reset.classList.remove("hiddenbtn");
  }
}

function timing() {
  if (isRun && rem >= 0) {
    let min = Math.floor(rem / 60);
    let sec = rem % 60;
    time.innerHTML = `${min}:${sec < 10 ? '0' + sec : sec}`;
    rem--;
  } else {
    isRun = false;
  }
}

function checkFood() {
  return bornSnake.some(part => part.x === ate.x && part.y === ate.y);
}

function uWin() {
  if (time.innerHTML === "0:00" && !isWin) {
    isWin = true;
    let win = document.createElement("div");
    win.className = "win";
    win.innerHTML = "🥳 You Win!";
    border.appendChild(win);
    reset.classList.remove("hiddenbtn");
  }
}

// Drawer toggle
document.getElementById("toggleDrawer").addEventListener("click", () => {
  document.getElementById("drawer").classList.toggle("hiddenbtn");
});

// Change background image on click
document.querySelectorAll(".image-options img").forEach(img => {
  img.addEventListener("click", () => {
    const bg = img.getAttribute("data-bg");
    document.body.style.backgroundImage = `url('${bg}')`;
  });
});

// Initialize the game on page load
littleSnake();  // Draw initial state

// Start the game loop but don't move snake until key pressed
game = setInterval(() => {
  if (isRun) {
    movingSnake();
    littleSnake();
    gameOver();
    uWin();
  }
}, 200);

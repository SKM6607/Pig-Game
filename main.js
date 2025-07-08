"use strict";
const dieFaces = {
  1: "One.png",
  2: "Two.png",
  3: "Three.png",
  4: "Four.png",
  5: "Five.png",
  6: "Six.png",
};
let playerControl = 0;
const imageDie = document.getElementById("imgs");
const newGame = document.querySelector(".newGameBtn");
const rollDie = document.querySelector(".rollDice");
const holdDie = document.querySelector(".holdScore");
const currentScore1 = document.querySelector(".currentScoreP1");
const currentScore2 = document.querySelector(".currentScoreP2");
const trueScore1 = document.querySelector(".trueScoreP1");
const trueScore2 = document.querySelector(".trueScoreP2");
const tScore1 = document.querySelector(".tscoreP1");
const tScore2 = document.querySelector(".tscoreP2");
const currentBg1 = document.querySelector(".bgPlr1");
const currentBg2 = document.querySelector(".bgPlr2");
const victoryMsg = document.querySelector(".Player");
tScore1.classList.remove("Hide");
currentBg1.classList.remove("Hide");
tScore2.classList.remove("Hide");
currentBg2.classList.remove("Hide");
function player1Show() {
  document.body.style.background =
    "linear-gradient(to right, rgb(189, 25, 25) 50%, gray 50%)";
  tScore1.classList.remove("Hide");
  currentBg1.classList.remove("Hide");
}

function player1Hide() {
  document.body.style.background =
    "linear-gradient(to right, gray 50%, gray 50%)";
  tScore1.classList.add("Hide");
  currentBg1.classList.add("Hide");
}

function player2Show() {
  document.body.style.background =
    "linear-gradient(to right, gray 50%, navy 50%)";
  tScore2.classList.remove("Hide");
  currentBg2.classList.remove("Hide");
}

function player2Hide() {
  document.body.style.background =
    "linear-gradient(to right, gray 50%, gray 50%)";
  tScore2.classList.add("Hide");
  currentBg2.classList.add("Hide");
}

function resetGame() {
  victoryMsg.classList.add("Wins");
  currentScore1.textContent =
    currentScore2.textContent =
    trueScore1.textContent =
    trueScore2.textContent =
      0;
  playerControl = 0;
  rollDie.disabled = false;
  holdDie.disabled = false;
  player2Hide();
  player1Show();
}

function checkWin() {
  if (
    Number(trueScore1.textContent) >= 10 ||
    Number(trueScore2.textContent) >= 10
  ) {
    if (Number(trueScore1.textContent) >= 10) {
      victoryMsg.textContent = "Player 1 Wins";
    } else {
      victoryMsg.textContent = "Player 2 Wins";
    }
    victoryMsg.classList.remove("Wins");
    player1Hide();
    player2Hide();
    document.body.style.background = "green";
    playerControl = -1;
    rollDie.disabled = true;
    holdDie.disabled = true;
    return true;
  }
  return false;
}

newGame.addEventListener("click", resetGame);

rollDie.addEventListener("click", () => {
  if (playerControl === -1) {
    document.body.style.background = "none";
    return;
  } // Game over

  const randomNum = Math.floor(Math.random() * 6) + 1;
  imageDie.src = dieFaces[randomNum];

  if (checkWin()) return;

  if (playerControl === 0) {
    if (randomNum === 1) {
      currentScore1.textContent = 0;
      playerControl = 1;
      player1Hide();
      player2Show();
    } else {
      currentScore1.textContent = Number(currentScore1.textContent) + randomNum;
    }
  } else if (playerControl === 1) {
    if (randomNum === 1) {
      currentScore2.textContent = 0;
      playerControl = 0;
      player2Hide();
      player1Show();
    } else {
      currentScore2.textContent = Number(currentScore2.textContent) + randomNum;
    }
  }
});

holdDie.addEventListener("click", () => {
  if (playerControl === -1) {
    document.body.style.background = "none";
    return; // Game over
  }

  if (playerControl === 0) {
    trueScore1.textContent =
      Number(trueScore1.textContent) + Number(currentScore1.textContent);
    currentScore1.textContent = 0;
    playerControl = 1;
    player1Hide();
    if (!checkWin()) player2Show();
  } else if (playerControl === 1) {
    trueScore2.textContent =
      Number(trueScore2.textContent) + Number(currentScore2.textContent);
    currentScore2.textContent = 0;
    playerControl = 0;
    player2Hide();
    if (!checkWin()) player1Show();
  }
});

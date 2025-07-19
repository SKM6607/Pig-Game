const playerScores = document.querySelectorAll(".playerScore");
const dieImage = document.getElementById("diceRoll");
const rollDieButton = document.querySelector(".rollBtn");
const newGameButton = document.querySelector(".newBtn");
const holdDieButton = document.querySelector(".holdBtn");
const player1Window = document.querySelector(".player1");
const player2Window = document.querySelector(".player2");
const currentScores = document.querySelectorAll(".currentScore");
const howToPlayButton = document.querySelector(".howToPlay");
const howToPlayModal = document.querySelectorAll(".hide");
const exitHowToPlayModal = document.querySelector(".exitHowToModal");
let ACTIVE_PLAYER = 1;
const diceImg = Object.freeze({
  1: "One.png",
  2: "Two.png",
  3: "Three.png",
  4: "Four.png",
  5: "Five.png",
  6: "Six.png",
});
function resetBoard() {
  if (
    player1Window.classList.contains("playerWinner") ||
    player2Window.classList.contains("playerWinner")
  ) {
    player1Window.classList.remove("playerWinner");
    player2Window.classList.remove("playerWinner");
  }
  playerSwitch(true);
  rollDieButton.disabled = holdDieButton.disabled = false;
  playerScores[0].textContent = playerScores[1].textContent = 0;
  dieImage.src = diceImg[1];
  currentScores[0].textContent = currentScores[1].textContent = 0;
  scores.fill(0);
}
function playerSwitch(reset = false) {
  scores.fill(0);
  currentScores[0].textContent = currentScores[1].textContent = 0;
  if (player1Window.classList.contains("playerActive") && !reset) {
    player2Window.classList.add("playerActive");
    player1Window.classList.remove("playerActive");
    ACTIVE_PLAYER = 2;
    return;
  }
  ACTIVE_PLAYER = 1;
  player1Window.classList.add("playerActive");
  player2Window.classList.remove("playerActive");
}
function playerVictory(playerWon) {
  if (
    player1Window.classList.contains("playerActive") ||
    player2Window.classList.contains("playerActive")
  ) {
    player1Window.classList.remove("playerActive");
    player2Window.classList.remove("playerActive");
  }
  rollDieButton.disabled = holdDieButton.disabled = true;
  document
    .querySelectorAll(".playerWindow")
    [playerWon].classList.add("playerWinner");
}
const scores = [0, 0];
rollDieButton.addEventListener("click", () => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  dieImage.src = diceImg[randomNumber];
  if (randomNumber === 1) {
    playerSwitch();
    return;
  }
  scores[ACTIVE_PLAYER - 1] += randomNumber;
  currentScores[ACTIVE_PLAYER - 1].textContent = scores[ACTIVE_PLAYER - 1];
});
holdDieButton.addEventListener("click", () => {
  playerScores[ACTIVE_PLAYER - 1].textContent =
    Number(playerScores[ACTIVE_PLAYER - 1].textContent) +
    scores[ACTIVE_PLAYER - 1];
  if (playerScores[ACTIVE_PLAYER - 1].textContent >= 100) {
    playerVictory(ACTIVE_PLAYER - 1);
    return;
  }
  playerSwitch();
});
newGameButton.addEventListener("click", () => resetBoard());
howToPlayButton.addEventListener("click", () => {
  howToPlayModal[0].classList.remove("hide");
  howToPlayModal[1].classList.remove("hide");
});
exitHowToPlayModal.addEventListener("click", () => {
  howToPlayModal[0].classList.add("hide");
  howToPlayModal[1].classList.add("hide");
});

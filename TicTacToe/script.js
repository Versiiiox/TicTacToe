let currentPlayer = "X";
let notCurrentPlayer = "O";
let gameOver = false;
let playerXname, playerOname;

let player1Wins = 0;
let player2Wins = 0;

let player1Score = (document.getElementById("score-Player-1").innerText = 0);
let player2Score = (document.getElementById("score-Player-2").innerText = 0);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const intervalID = setInterval(() => {
  nameUpdater();
  scoreUpdater();
  styleUpdater();
}, 10);

function nameUpdater() {
  if (
    document.getElementById("player-1").value != "" &&
    document.getElementById("player-2").value != ""
  ) {
    playerXname = document.getElementById("player-1").value;
    playerOname = document.getElementById("player-2").value;
    document.getElementById("player-X").innerText = playerXname;
    document.getElementById("player-O").innerText = playerOname;
  } else {
    playerXname = "Player 1";
    playerOname = "Player 2";
    document.getElementById("player-X").innerText = playerXname;
    document.getElementById("player-O").innerText = playerOname;
  }
}

function scoreUpdater() {
  player1Score = document.getElementById("score-Player-1").innerText =
    player1Wins;
  player2Score = document.getElementById("score-Player-2").innerText =
    player2Wins;
}

function styleUpdater() {
  document.getElementById(`player-${currentPlayer}`).style.color = "green";
  document.getElementById(`player-${notCurrentPlayer}`).style.color = "red";

  document.getElementById(`player-${currentPlayer}`).style.textShadow =
    "2px 2px 40px green";
  document.getElementById(`player-${notCurrentPlayer}`).style.textShadow =
    "2px 2px 40px red";
}

document.querySelectorAll(".TicTacToeField").forEach((field) => {
  field.addEventListener("click", () => {
    if (!gameOver) {
      const h1 = field.querySelector("h1");
      if (h1.textContent === "") {
        h1.textContent = currentPlayer;

        // Win
        if (checkWin(currentPlayer)) {
          setTimeout(() => {
            currentPlayer === "X"
              ? alert(`${playerXname} hat gewonnen!`) + player1Wins++
              : alert(`${playerOname} hat gewonnen!`) + player2Wins++;

            restartGame();
          }, 100);
          gameOver = true;
          // Draw
        } else if (checkDraw()) {
          setTimeout(() => {
            alert("Unentschieden!");
            restartGame();
          }, 100);
          gameOver = true;
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          if (currentPlayer === "X") {
            notCurrentPlayer = "O";
          } else {
            notCurrentPlayer = "X";
          }
        }
      }
    }
  });
});

function restartGame() {
  setTimeout(() => {
    document.querySelectorAll(".TicTacToeField h1").forEach((h1) => {
      h1.textContent = "";
    });
    gameOver = false;
  }, 500);
}

function checkWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      const h1 = document.querySelector(
        `.TicTacToeField:nth-child(${index + 1}) h1`
      );
      return h1.textContent === player;
    });
  });
}

function checkDraw() {
  return [...document.querySelectorAll(".TicTacToeField h1")].every(
    (h1) => h1.textContent !== ""
  );
}

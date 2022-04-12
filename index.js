cells = document.querySelectorAll(".cell");
stat = document.querySelector("#StatusText");
restart = document.querySelector("#restartBtn");

let win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellclicked));
  restart.addEventListener("click", restartgame);
  stat.textContent = `${currentPlayer} 's turn`;
  running = true;
}

function cellclicked() {
  cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || running == false) {
    return;
  }
  updatecell(this, cellIndex);
  checkWinner();
}

function updatecell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;

  changeplayer();
}
function changeplayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  stat.textContent = `${currentPlayer} 's turn`;
}
function checkWinner() {
  let won = false;

  for (i = 0; i <= win.length; i++) {
    condition = win[i];
    cellA = options[condition[0]];
    cellB = options[condition[1]];
    cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      won = true;
      break;
    }
  }
  if (won) {
    stat.textContent = `${currentPlayer} WON`;
    running = false;
  } else if (!options.includes("")) {
    stat.textContent = "DRAW!";
    running = false;
  } else {
    changeplayer();
  }
}

function restartgame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];

  stat.textContent = `${currentPlayer} 's turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}


function createBoard(container, gameboard, isEnemy = false) {
  container.innerHTML = "";

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement("button");

      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;

      const status = gameboard.getCellStatus([row, col]);

      if (status === "ship" && !isEnemy) {
        cell.classList.add("ship");
      }

      if (status === "hit") {
        cell.classList.add("hit");
      }

      if (status === "miss") {
        cell.classList.add("miss");
      }

      container.appendChild(cell);
    }
  }
}


function renderBoards(game) {
  const playerBoard = document.querySelector("#player-board");
  const computerBoard = document.querySelector("#computer-board");

  createBoard(playerBoard, game.player.gameboard);
  createBoard(computerBoard, game.computer.gameboard, true);
}

export { renderBoards };

export default createBoard;

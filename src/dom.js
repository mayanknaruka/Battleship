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
        cell.disabled = true;
      }

      if (status === "miss") {
        cell.classList.add("miss");
        cell.disabled = true;
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

function setupGameEvents(getGame) {
  const computerBoard = document.querySelector("#computer-board");
  const message = document.querySelector("#game-message");

  computerBoard.addEventListener("click", (event) => {
    const cell = event.target.closest(".cell");

    if (!cell || !computerBoard.contains(cell)) return;

    const game = getGame();

    if (game.gameOver) return;

    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    const result = game.playTurn([row, col]);

    if (result.playerAttack === "already-attacked") {
      message.textContent = "Already attacked here!";
      return;
    }

    renderBoards(game);

    message.className = "";

    if (result.winner === "real") {
      message.textContent = "🎉 You win! All enemy ships sunk!";
      message.classList.add("win");
      return;
    }

    if (result.winner === "computer") {
      message.textContent = "💀 Computer wins! Your fleet is destroyed!";
      message.classList.add("lose");
      return;
    }

    const attackText = result.playerAttack === "hit" ? "💥 Hit!" : "🌊 Miss!";
    const compText = result.computerAttack === "hit" ? "💥 Hit!" : "🌊 Miss!";
    message.textContent = `You: ${attackText}  |  Computer: ${compText}`;
  });
}

export { createBoard, renderBoards, setupGameEvents };

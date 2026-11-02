
import GameController from "./gameController.js";
import { renderBoards, setupGameEvents } from "./dom.js";

let game;

function startNewGame() {
  game = GameController();

  renderBoards(game);

  document.querySelector("#game-message").textContent =
    "Your turn! Attack the enemy board.";
}

setupGameEvents(() => game);

document
  .querySelector("#restart-button")
  .addEventListener("click", startNewGame);

startNewGame();

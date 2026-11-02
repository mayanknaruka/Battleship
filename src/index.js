import GameController from "./gameController.js";
import { renderBoards } from "./dom.js";

const game = GameController();

renderBoards(game);

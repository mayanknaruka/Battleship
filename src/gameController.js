import Player from "./player";

function GameController() {
  const player = Player("real");
  const computer = Player("computer");

  let gameOver = false;
  let winner = null;

  // Ships: [length, ...]
  const shipLengths = [5, 4, 3, 3, 2];

  function placeFleetRandom(gameboard) {
    shipLengths.forEach((length) => {
      let placed = false;

      while (!placed) {
        const isHorizontal = Math.random() < 0.5;
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);

        const coordinates = [];
        let valid = true;

        for (let i = 0; i < length; i++) {
          const r = isHorizontal ? row : row + i;
          const c = isHorizontal ? col + i : col;

          if (r >= 10 || c >= 10) {
            valid = false;
            break;
          }

          coordinates.push([r, c]);
        }

        if (!valid) continue;

        // Check no overlap with existing ships
        const hasOverlap = coordinates.some((coord) => {
          const key = coord.join(",");
          return gameboard.ships.some((_, idx) => {
            // Check via getCellStatus
            return gameboard.getCellStatus(coord) === "ship";
          });
        });

        if (hasOverlap) continue;

        gameboard.placeShip(length, coordinates);
        placed = true;
      }
    });
  }

  placeFleetRandom(player.gameboard);
  placeFleetRandom(computer.gameboard);

  function computerAttack() {
    const availableCoordinates = [];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (!player.gameboard.hasBeenAttacked([row, col])) {
          availableCoordinates.push([row, col]);
        }
      }
    }

    const randomIndex = Math.floor(
      Math.random() * availableCoordinates.length
    );

    const coordinate = availableCoordinates[randomIndex];

    return player.gameboard.receiveAttack(coordinate);
  }

  function playTurn(coordinate) {
    if (gameOver) {
      return {
        playerAttack: "game-over",
        computerAttack: null,
        winner,
      };
    }

    const playerAttack = computer.gameboard.receiveAttack(coordinate);

    if (playerAttack !== "hit" && playerAttack !== "miss") {
      return {
        playerAttack,
        computerAttack: null,
        winner: null,
      };
    }

    if (computer.gameboard.allShipsSunk()) {
      gameOver = true;
      winner = "real";

      return {
        playerAttack,
        computerAttack: null,
        winner,
      };
    }

    const computerAttackResult = computerAttack();

    if (player.gameboard.allShipsSunk()) {
      gameOver = true;
      winner = "computer";
    }

    return {
      playerAttack,
      computerAttack: computerAttackResult,
      winner,
    };
  }

  return {
    player,
    computer,
    playTurn,
    computerAttack,
    get gameOver() {
      return gameOver;
    },
    get winner() {
      return winner;
    },
  };
}

export default GameController;

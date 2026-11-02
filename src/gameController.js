import Player from "./player";

function GameController() {
  const player = Player("real");
  const computer = Player("computer");

  let gameOver = false;
  let winner = null;

  // Predetermined ship positions
  const fleet = [
    { length: 5, row: 0, col: 0 },
    { length: 4, row: 2, col: 0 },
    { length: 3, row: 4, col: 0 },
    { length: 3, row: 6, col: 0 },
    { length: 2, row: 8, col: 0 },
  ];

  function placeFleet(gameboard) {
    fleet.forEach((ship) => {
      const coordinates = [];

      for (let i = 0; i < ship.length; i++) {
        coordinates.push([ship.row, ship.col + i]);
      }

      gameboard.placeShip(ship.length, coordinates);
    });
  }

  placeFleet(player.gameboard);
  placeFleet(computer.gameboard);

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
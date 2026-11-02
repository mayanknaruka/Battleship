import Ship from "./ship";

function Gameboard() {
  const ships = [];
  const missedAttacks = [];
  const attacksReceived = [];
  const board = new Map();

  function placeShip(length, coordinates) {
    const ship = Ship(length);

    ships.push(ship);

    coordinates.forEach((coordinate) => {
      const key = coordinate.join(",");
      board.set(key, ship);
    });
  }

  function hasBeenAttacked(coordinate) {
    const key = coordinate.join(",");

    return attacksReceived.some(
      (attack) => attack.join(",") === key
    );
  }

  function receiveAttack(coordinate) {
    if (hasBeenAttacked(coordinate)) {
      return "already-attacked";
    }

    attacksReceived.push(coordinate);

    const key = coordinate.join(",");

    if (board.has(key)) {
      const ship = board.get(key);
      ship.hit();

      return "hit";
    }

    missedAttacks.push(coordinate);

    return "miss";
  }

  function getCellStatus(coordinate) {
    const key = coordinate.join(",");

    if (hasBeenAttacked(coordinate)) {
      return board.has(key) ? "hit" : "miss";
    }

    return board.has(key) ? "ship" : "empty";
  }

  function allShipsSunk() {
    return ships.every((ship) => ship.isSunk());
  }

  return {
    ships,
    missedAttacks,
    placeShip,
    receiveAttack,
    allShipsSunk,
    getCellStatus,
    hasBeenAttacked,
  };
}

export default Gameboard;
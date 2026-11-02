import Ship from "./ship";

function Gameboard() {
  const ships = [];
  const missedAttacks = [];
  const board = new Map();

  function placeShip(length, coordinates) {
    const ship = Ship(length);

    ships.push(ship);

    coordinates.forEach((coordinate) => {
      const key = coordinate.join(",");
      board.set(key, ship);
    });
  }

  function receiveAttack(coordinate) {
    const key = coordinate.join(",");

    if (board.has(key)) {
      const ship = board.get(key);
      ship.hit();

      return "hit";
    }

    missedAttacks.push(coordinate);

    return "miss";
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
  };
}

export default Gameboard;
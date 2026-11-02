import Gameboard from "../src/gameBoard";
describe("Gameboard", () => {
  test("creates an empty gameboard", () => {
    const gameboard = Gameboard();

    expect(gameboard.ships.length).toBe(0);
  });

  test("places a ship on the board", () => {
    const gameboard = Gameboard();

    gameboard.placeShip(3, [
      [0, 0],
      [0, 1],
      [0, 2],
    ]);

    expect(gameboard.ships.length).toBe(1);
  });

  test("receives an attack and hits a ship", () => {
    const gameboard = Gameboard();

    gameboard.placeShip(3, [
      [0, 0],
      [0, 1],
      [0, 2],
    ]);

    gameboard.receiveAttack([0, 1]);

    expect(gameboard.ships[0].hits).toBe(1);
  });

  test("records missed attacks", () => {
    const gameboard = Gameboard();

    gameboard.receiveAttack([5, 5]);

    expect(gameboard.missedAttacks).toEqual([[5, 5]]);
  });

  test("reports whether all ships are sunk", () => {
    const gameboard = Gameboard();

    gameboard.placeShip(2, [
      [0, 0],
      [0, 1],
    ]);

    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);

    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test("returns false when ships are still alive", () => {
    const gameboard = Gameboard();

    gameboard.placeShip(2, [
      [0, 0],
      [0, 1],
    ]);

    gameboard.receiveAttack([0, 0]);

    expect(gameboard.allShipsSunk()).toBe(false);
  });
});
import Gameboard from "../src/gameBoard";
test("does not allow attacking the same coordinate twice", () => {
  const gameboard = Gameboard();

  gameboard.receiveAttack([5, 5]);
  gameboard.receiveAttack([5, 5]);

  expect(gameboard.missedAttacks.length).toBe(1);
});

test("returns hit status for an attacked ship", () => {
  const gameboard = Gameboard();

  gameboard.placeShip(2, [
    [0, 0],
    [0, 1],
  ]);

  gameboard.receiveAttack([0, 0]);

  expect(gameboard.getCellStatus([0, 0])).toBe("hit");
});

test("returns ship status for an unattacked ship", () => {
  const gameboard = Gameboard();

  gameboard.placeShip(2, [
    [0, 0],
    [0, 1],
  ]);

  expect(gameboard.getCellStatus([0, 0])).toBe("ship");
});

test("returns miss status for a missed attack", () => {
  const gameboard = Gameboard();

  gameboard.receiveAttack([5, 5]);

  expect(gameboard.getCellStatus([5, 5])).toBe("miss");
});
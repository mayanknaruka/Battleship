import Ship from "../src/ship";

describe("Ship", () => {
  test("creates a ship with the correct length", () => {
    const ship = Ship(3);

    expect(ship.length).toBe(3);
  });

  test("starts with zero hits", () => {
    const ship = Ship(3);

    expect(ship.hits).toBe(0);
  });

  test("increases hits when hit() is called", () => {
    const ship = Ship(3);

    ship.hit();

    expect(ship.hits).toBe(1);
  });

  test("returns false when the ship is not sunk", () => {
    const ship = Ship(3);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(false);
  });

  test("returns true when hits reach the ship length", () => {
    const ship = Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});
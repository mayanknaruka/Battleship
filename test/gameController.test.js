import GameController from "../src/gameController";

describe("GameController", () => {
  test("creates a human player and a computer player", () => {
    const game = GameController();

    expect(game.player.type).toBe("real");
    expect(game.computer.type).toBe("computer");
  });

  test("places ships on both gameboards", () => {
    const game = GameController();

    expect(game.player.gameboard.ships.length).toBe(5);
    expect(game.computer.gameboard.ships.length).toBe(5);
  });

  test("player can attack the computer's board", () => {
    const game = GameController();

    const result = game.playTurn([0, 0]);

    expect(["hit", "miss"]).toContain(result.playerAttack);
  });

  test("does not allow the same attack twice", () => {
    const game = GameController();

    game.playTurn([0, 0]);

    const result = game.playTurn([0, 0]);

    expect(result.playerAttack).toBe("already-attacked");
  });

  test("computer makes a legal attack", () => {
    const game = GameController();

    game.playTurn([9, 9]);

    const attackedCoordinates = [];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (game.player.gameboard.hasBeenAttacked([row, col])) {
          attackedCoordinates.push([row, col]);
        }
      }
    }

    expect(attackedCoordinates.length).toBe(1);
  });
});
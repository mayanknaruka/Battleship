import Player from "../src/player";

describe("Player", () => {
  test("creates a real player", () => {
    const player = Player("real");

    expect(player.type).toBe("real");
  });

  test("creates a computer player", () => {
    const player = Player("computer");

    expect(player.type).toBe("computer");
  });

  test("each player has its own gameboard", () => {
    const player = Player("real");

    expect(player.gameboard).toBeDefined();
  });

  test("each player has a separate gameboard", () => {
    const player1 = Player("real");
    const player2 = Player("computer");

    expect(player1.gameboard).not.toBe(player2.gameboard);
  });
});

# Battleship

A classic Battleship game built using JavaScript as part of [The Odin Project](https://www.theodinproject.com/). Play against the computer by attacking coordinates on its board and try to sink all its ships before it sinks yours.

## Features

- Interactive 10×10 gameboards for both player and computer.
- Five ships placed on each board.
- Click on the computer's board to attack.
- Random computer attacks.
- Prevents attacking the same coordinate twice.
- Displays hit and miss results.
- Tracks ship hits and detects when all ships are sunk.
- Announces the winner when the game ends.
- Restart button to start a new game.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Jest
- Babel
- Vite

## Project Structure

```text
Battleship/
├── src/
│   ├── index.js
│   ├── dom.js
│   ├── gameController.js
│   ├── player.js
│   ├── gameboard.js
│   └── ship.js
├── test/
│   ├── ship.test.js
│   ├── gameboard.test.js
│   ├── player.test.js
│   └── gameController.test.js
├── index.html
├── style.css
├── package.json
├── babel.config.js
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd Battleship
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Running Tests

Run the Jest test suite using:

```bash
npm test
```

The project includes tests for:

- Ship functionality
- Gameboard operations
- Player creation
- GameController and turn management

## How to Play

1. Start a new game.
2. View your board and the computer's board.
3. Click any coordinate on the computer's board to attack.
4. Red indicates a hit, while yellow indicates a miss.
5. The computer automatically attacks your board after your turn.
6. Sink all the computer's ships to win the game.
7. Use the Restart Game button to play again.

## What I Learned

Through this project, I practiced:

- JavaScript factory functions and modules.
- Object-oriented programming concepts.
- DOM manipulation and event delegation.
- Working with arrays and Maps.
- Managing game state and player turns.
-
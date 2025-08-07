// ##################################################
// Planning
// ##################################################

// === Noughts and Crosses ===
// 1. Two players take turns marking spaces in a three-by-three grid
// 2. One player with Xs and the other with Os
// 3. A player wins when they mark all three spaces in a row, column, or diagonal
// 4. If no player has a line of three marks, the game is a tie

// === Requirements ===
// 1. Two player game that allows them to enter their names
// 2. Start and Reset button
// 3. Display that shows the result of the game
// ##################################################
// 4. Logic that checks for when a game is over
// 5. Logic that checks for all winning 3-in-a-rows and ties
// 6. Function that renders the contents of the gameboard array to page (grid)
// 7. Functions that allow players to add marks to specific areas on the board by clicking the grid cells
// 8. Logic that stops players from marking spots that are already taken

// ##################################################
// Program
// ##################################################

// Creates one instance of the gameBoard (IIFE)
const gameBoard = (function () {
  // Array representing the 3x3 grid, each index is a cell (empty cell = no mark)
  const board = ["", "", "", "", "", "", "", "", ""];

  // Creates a copy of the current board state without giving direct access to modify it (closure)
  const getBoard = () => board;

  // Updates cell to contain the current players marker
  const updateCell = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    // If cell already taken do not change
    return false;
  };

  // Returns the function outputs
  return {
    getBoard,
    updateCell,
  };
})();

// Creates player object with name and marker
function createPlayer(name, marker) {
  return { name, marker };
}

// Main game controller handles the game logic
const gameController = (function () {
  // Initialise players
  const playerOne = createPlayer("One", "X");
  const playerTwo = createPlayer("Two", "O");

  // Start with player one
  let currentPlayer = playerOne;

  // Tracks if game should end
  let isGameOver = false;

  // Winning index combinations
  const winningCombos = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Function for players turn
  const playTurn = (position) => {
    // Get current state of board
    const board = gameBoard.getBoard();

    // If game is over stop player turns
    if (isGameOver) {
      return;
    }

    // Only allow board position if cell is empty
    if (board[position] === "") {
      // If empty update cell with current players marker
      if (gameBoard.updateCell(position, currentPlayer.marker)) {
        // Check if current player has won by checking winning combos
        for (let combo of winningCombos) {
          if (
            board[combo[0]] === currentPlayer.marker &&
            board[combo[1]] === currentPlayer.marker &&
            board[combo[2]] === currentPlayer.marker
          ) {
            console.log(`${currentPlayer.name} wins!`);
            isGameOver = true; // End the game
            return;
          }
        }

        // If board is full (No winning combos) the game is a tie
        if (!board.includes("")) {
          console.log("It's a tie!");
          isGameOver = true; // End the game
          return;
        }

        // If game continues, switch to the next player
        switchPlayer();
      }
    }
  };

  // Function for switching between players
  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  // Return the function outputs
  return {
    playTurn,
    switchPlayer,
  };
})();

console.log(gameBoard.getBoard());
// Win example:
// gameController.playTurn(0);
// gameController.playTurn(1);
// gameController.playTurn(3);
// gameController.playTurn(2);
// gameController.playTurn(6);
// Tie example:
// gameController.playTurn(0);
// gameController.playTurn(1);
// gameController.playTurn(2);
// gameController.playTurn(4);
// gameController.playTurn(3);
// gameController.playTurn(5);
// gameController.playTurn(7);
// gameController.playTurn(6);
// gameController.playTurn(8);
console.log(gameBoard.getBoard());

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

  // Reset board function fills array with empty strings
  const resetBoard = () => {
    board.fill("");
  };

  // Returns the function outputs to be usable by other functions
  return {
    getBoard,
    updateCell,
    resetBoard,
  };
})();

// Creates player object with name and marker
function createPlayer(name, marker) {
  return { name, marker };
}

// Main game controller handles the game logic (IIFE)
const gameController = (function () {
  // Initialise players
  const playerOne = createPlayer("1", "X");
  const playerTwo = createPlayer("2", "O");

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

  // Reset game function for resetting variables
  const resetGame = () => {
    isGameOver = false;
    currentPlayer = playerOne;
  };

  // Function for retrieving current player name
  const getCurrentPlayerName = () => {
    return currentPlayer.name;
  };

  // Function for players turn
  const playTurn = (position) => {
    // Get current state of board
    const board = gameBoard.getBoard();

    // If game is over stop player turns
    if (isGameOver) {
      return { status: "gameover" };
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
            return { status: "win", winner: currentPlayer.name };
          }
        }

        // If board is full (No winning combos) the game is a tie
        if (!board.includes("")) {
          console.log("It's a tie!");
          isGameOver = true; // End the game
          return { status: "tie" };
        }

        // If game continues, switch to the next player
        switchPlayer();
        return { status: "continue" };
      }
    }
  };

  // Function for switching between players
  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  // Returns the function outputs to be usable by other functions
  return {
    playTurn,
    switchPlayer,
    resetGame,
    getCurrentPlayerName,
  };
})();

// IIFE for handling the display of the game on the page
const interfaceController = (function () {
  // Get elements by class and id
  const cells = document.querySelectorAll(".cell");
  const display = document.querySelector("#game-result");
  const restartBtn = document.querySelector("#restart-btn");

  // Display the current board state on the page
  const displayBoard = () => {
    const board = gameBoard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      cell.classList.remove("x", "o"); // Remove previous classes
      if (board[index] === "X") {
        cell.classList.add("x");
      } else if (board[index] === "O") {
        cell.classList.add("o");
      }
    });
  };

  // Show message of winner or tie
  const showResult = (message) => {
    display.textContent = message;
  };

  // Reset the game
  restartBtn.addEventListener("click", () => {
    gameBoard.resetBoard(); // Clear the gameboard array
    gameController.resetGame(); // Reset game logic
    interfaceController.displayBoard(); // Refresh the UI
    interfaceController.showResult(
      `Player ${gameController.getCurrentPlayerName()}'s turn.`
    ); // Clear the message
    updateActivePlayerUI("X");
  });

  // Add marker when clicked
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      const result = gameController.playTurn(index);
      displayBoard();

      // After marker is placed change display based on these factors:
      if (result.status === "win") {
        interfaceController.showResult(`Player ${result.winner} wins!`);
      } else if (result.status === "tie") {
        interfaceController.showResult("It's a tie!");
      } else if (result.status === "gameover") {
        interfaceController.showResult("Game Over.");
      } else {
        interfaceController.showResult(
          `Player ${gameController.getCurrentPlayerName()}'s turn.`
        );
      }

      // Update the active player highlight:
      updateActivePlayerUI(
        gameController.getCurrentPlayerName() === "1" ? "X" : "O"
      );
    });
  });

  const playerOne = document.querySelector("#player-one");
  const playerTwo = document.querySelector("#player-two");
  const gameboard = document.querySelector("#gameboard");

  function updateActivePlayerUI(marker) {
    if (marker === "X") {
      playerOne.classList.add("active");
      playerTwo.classList.remove("active");
      gameboard.classList.add("x-turn");
      gameboard.classList.remove("o-turn");
    } else {
      playerOne.classList.remove("active");
      playerTwo.classList.add("active");
      gameboard.classList.add("o-turn");
      gameboard.classList.remove("x-turn");
    }
  }

  return {
    displayBoard,
    showResult,
    updateActivePlayerUI,
  };
})();

interfaceController.updateActivePlayerUI("X");
interfaceController.showResult("Player 1's turn.");

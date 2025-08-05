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

  const updateCell = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  // Returns the copied board
  return {
    getBoard,
    updateCell,
  };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const gameController = (function () {
  //
  const playerOne = createPlayer("One", "X");
  const playerTwo = createPlayer("Two", "O");
  let currentPlayer = playerOne;

  const playTurn = (position) => {
    const board = gameBoard.getBoard();
    if (board[position] === "") {
      if (gameBoard.updateCell(position, currentPlayer.marker)) {
        switchPlayer();
      }
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  return {
    playTurn,
    switchPlayer,
  };
})();

console.log(gameBoard.getBoard());
gameController.playTurn(0);
console.log(gameBoard.getBoard());

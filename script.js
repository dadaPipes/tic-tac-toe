class Board {
  constructor() {
    this.board = Array(9).fill(null);
  }
}

class Player {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
  }

  placeMarker(board, index) {
    if (board[index] === null) {
      board[index] = this.marker;
    }
  }
}

class GameFlow {
  constructor(player1, player2, board) {
    this.board = new Board();
    this.currentPlayer = player1; // Start with the first player
    this.player1 = player1;
    this.player2 = player2;
    this.board = board;
  }

  playRound() {
    while (this.findWinner() === null) {
      this.board.printBoard();
      const index = this.getUserInput();
      this.currentPlayer.placeMarker(this.board.board, index);
      if (this.findWinner() === null) {
        this.switchTurn()
      }
    }
    console.log(`${this.findWinner().name} wins!`);
  }

  findWinner() {
    const linesToCheck = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const line of linesToCheck) {
      const [a, b, c] = line;
      if (
        this.board.board[a] !== null &&
        this.board.board[a] === this.board.board[b] &&
        this.board.board[b] === this.board.board[c]
      ) {
        return this.currentPlayer;
      }
    }

    // No winner found
    return null;
  }

  switchTurn() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  getUserInput() {
    return this.currentPlayer.marker;
  }
}

class DisplayGame {
  constructor(game) {
    this.game = game;
  }

  displayBoard() {
    let boardContainer = document.querySelector(".board-container");
    const board = document.createElement("ul");
    board.classList.add("board");

    for (let i = 0; i < 9; i++) {
      const field = document.createElement("li");
      field.classList.add("board__field");

      board.appendChild(field);
    }

    boardContainer.appendChild(board);
  }
}

const board = new Board();
const player1 = new Player("Human", "Cross");
const player2 = new Player("Computer", "Circle");
const game = new GameFlow(player1 , player2, board);
console.log(game);
const displayGame = new DisplayGame(game);
displayGame.displayBoard();

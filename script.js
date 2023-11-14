class Board {
  constructor() {
    this.fields = Array(9).fill(null);
  }
}

class DisplayController {
  constructor(board, gameFlow) {
    this.board = board;
    this.gameFlow = gameFlow;
    this.createBoard();
  }

  createBoard() {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    this.board.fields.forEach((element, index) => {
      const button = document.createElement("button");
      button.classList.add("board__field");
      button.type = "button";
      button.addEventListener("click", () => {
        this.gameFlow.placeMarker(index, button);
      });
      boardDiv.appendChild(button);
    });
    document.body.appendChild(boardDiv);
  }
}

class Player {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
  }
}

class GameFlow {
  constructor(player1, player2, board) {
    this.currentPlayer = player1; // Start with the first player
    this.player1 = player1;
    this.player2 = player2;
    this.board = board;
  }

  placeMarker(index, button) {
    if (this.board.fields[index] === null) {
      this.board.fields[index] = this.currentPlayer.marker;
      button.textContent = this.currentPlayer.marker;
      this.checkGameStatus(index);
    }
  }

  checkGameStatus() {
    if (this.findWinner()) {
      console.log(this.currentPlayer.name + " wins!");
    } else if (this.isBoardFull()) {
      console.log("It's a draw!");
    } else {
      this.switchTurn();
    }
  }

  findWinner() {
    const linesToCheck = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let line of linesToCheck) {
      if (
        this.board.fields[line[0]] !== null &&
        this.board.fields[line[0]] === this.board.fields[line[1]] &&
        this.board.fields[line[1]] === this.board.fields[line[2]]
      ) {
        return this.currentPlayer;
      }
    }

    // No winner found
    return null;
  }

  isBoardFull() {
    return this.board.fields.every(field => field !== null);
  }

  switchTurn() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }
}

(function() {
  const board = new Board();
  console.log(board);

  const player1 = new Player("Human", "X");
  console.log(player1);

  const player2 = new Player("Computer", "O");
  console.log(player2);

  const gameFlow = new GameFlow(player1, player2, board);
  const displayController = new DisplayController(board, gameFlow);
})();
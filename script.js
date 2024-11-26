// Maybe check only after a player makes a 3rd move

function startGame(board) {
  let gameboard = board;
  let player1 = createPlayer("Player 1", "X");
  let player2 = createPlayer("Player 2", "O");

  const makeMove = (row, col, player) => {
    if (gameboard.board[row][col] === " ") {
      gameboard.board[row][col] = player.symbol;
      if (isWin()) {
        console.log(player.name + " Wins!!");
      }

      if (isDraw()) {
        console.log("The game is a draw");
      }
    } else {
      console.log("Cannot make move, space already occupied");
    }
  };

  const isDraw = () => {
    if (
      gameboard.board[0].includes(" ") ||
      gameboard.board[1].includes(" ") ||
      gameboard.board[2].includes(" ")
    ) {
      return false;
    } else {
      // only checks for a draw after a win is checked
      return true;
    }
  };

  const isWin = () => {
    for (let index = 0; index < gameboard.board.length; index++) {
      let rowArr = gameboard.board[index];
      if (checkWin(rowArr)) return true;
    }

    for (let i = 0; i < gameboard.board.length; i++) {
      let colArr = [];
      for (let j = 0; j < gameboard.board.length; j++) {
        colArr.push(gameboard.board[j][i]);
      }
      if (checkWin(colArr)) return true;
    }

    let diagArr1 = [
      gameboard.board[0][0],
      gameboard.board[1][1],
      gameboard.board[2][2],
    ];
    let diagArr2 = [
      gameboard.board[2][0],
      gameboard.board[1][1],
      gameboard.board[0][2],
    ];
    if (checkWin(diagArr1)) return true;
    if (checkWin(diagArr2)) return true;

    return false;
  };
  const updateBoard = () => {};

  return { gameboard, player1, player2, makeMove, isDraw, isWin, updateBoard };
}

function generateGameBoard() {
  let board = [
    ["O", "X", "X"],
    [" ", "O", " "],
    ["X", " ", " "],
  ];

  return { board };
}

function createPlayer(name, symbol) {
  return { name, symbol };
}

function checkWin(array) {
  if (array.includes("X") || array.includes("O")) {
    return array[0] === array[1] && array[1] === array[2];
  } else {
    return false;
  }
}

let game = startGame(generateGameBoard());

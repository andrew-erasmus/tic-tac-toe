// Maybe check only after a player makes a 3rd move

function startGame(board) {
  let turn = 1;
  let gameboard = board;
  let player1 = createPlayer("Player 1", "X");
  let player2 = createPlayer("Player 2", "O");
  let tiles = document.querySelectorAll("div.grid-item");

  const makeMove = (row, col, player, tile) => {
    if (gameboard.board[row][col] === " ") {
      gameboard.board[row][col] = player.symbol;
      if (player.symbol === "X") {
        generateX(tile);
      } else {
        generateO(tile);
      }

      if (isWin()) {
        displayMessage(player.name + " Wins!!");
        addScore(player);
      } else if (isDraw()) {
        displayMessage("The game is a draw!!");
      }

      return true;
    } else {
      return false;
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
  const resetBoard = () => {
    tiles.forEach((tile) => {
      if (tile.hasChildNodes()) tile.removeChild(tile.firstChild);
    });
    gameboard = generateGameBoard();
    resetTurn();
  };

  const resetGame = () => {
    resetBoard();
    resetTurn();
    player1.score = 0;
    player2.score = 0;
    let p1Score = document.getElementById("p1-score");
    p1Score.innerHTML = 0;
    let p2Score = document.getElementById("p2-score");
    p1Score.innerHTML = 0;
  };

  const addScore = (player) => {
    if (player.name === "Player 1") {
      player.score++;
      let p1Score = document.getElementById("p1-score");
      p1Score.innerHTML = player.score;
      if (player.score === 5) {
        displayMessage("5 points reached - Player 1 wins the game.");
        resetGame();
        p1Score.innerHTML = 0;
      }
    } else if (player.name === "Player 2") {
      player.score++;
      let p2Score = document.getElementById("p2-score");
      p2Score.innerHTML = player.score;
      if (player.score === 5) {
        displayMessage("5 points reached - Player 2 wins the game.");
        resetGame();
        p2Score.innerHTML = 0;
      }
    }
  };

  return {
    gameboard,
    player1,
    player2,
    makeMove,
    isDraw,
    isWin,
    resetBoard,
    resetGame,
    tiles,
    turn,
  };
}

function generateGameBoard() {
  let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  return { board };
}

function generateX(tile) {
  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("class", "cross");
  svgElement.setAttribute("viewBox", "0 0 16 16");
  svgElement.setAttribute("height", "100");
  svgElement.setAttribute("width", "100");

  // Create the <polygon> element
  const polygonElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  polygonElement.setAttribute("fill-rule", "evenodd");
  polygonElement.setAttribute(
    "points",
    "8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414"
  );

  // Append the polygon to the SVG
  svgElement.appendChild(polygonElement);
  tile.appendChild(svgElement);
}

function generateO(tile) {
  // Create an SVG element
  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("class", "nought");
  svgElement.setAttribute("viewBox", "0 0 448 512");
  svgElement.setAttribute("height", "100");
  svgElement.setAttribute("width", "100");

  // Create the <path> element
  const pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElement.setAttribute(
    "d",
    "M224 32.01c-123.5 0-224 100.5-224 224s100.5 224 224 224s224-100.5 224-224S347.5 32.01 224 32.01zM224 416c-88.22 0-160-71.78-160-160s71.78-159.1 160-159.1s160 71.78 160 159.1S312.2 416 224 416z"
  );

  // Append the path to the SVG
  svgElement.appendChild(pathElement);

  // Append the SVG to the target div
  tile.appendChild(svgElement);
}

function createPlayer(name, symbol) {
  return { name, symbol, score: 0 };
}

function checkWin(array) {
  if (array.includes("X") || array.includes("O")) {
    return array[0] === array[1] && array[1] === array[2];
  } else {
    return false;
  }
}

let game = startGame(generateGameBoard());

function resetTurn() {
  game.turn = 1;
}

game.tiles.forEach((item) => {
  item.addEventListener("click", () => {
    if (game.turn % 2 == 1) {
      //player 1 turn
      let coordinates = getCoord(item);
      let result = game.makeMove(
        coordinates.row,
        coordinates.col,
        game.player1,
        item
      );
      if (result === true) {
        game.turn++;
      }
    } else {
      //player 2 turn
      let coordinates = getCoord(item);
      let result = game.makeMove(
        coordinates.row,
        coordinates.col,
        game.player2,
        item
      );
      if (result === true) {
        game.turn++;
      }
    }
  });
});

let resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
  game.resetGame();
});

function getCoord(element) {
  let cssString = element.className;

  switch (cssString) {
    case "grid-item one":
      return { row: 0, col: 0 };
      break;

    case "grid-item two":
      return { row: 0, col: 1 };
      break;

    case "grid-item three":
      return { row: 0, col: 2 };
      break;

    case "grid-item four":
      return { row: 1, col: 0 };
      break;

    case "grid-item five":
      return { row: 1, col: 1 };
      break;

    case "grid-item six":
      return { row: 1, col: 2 };
      break;

    case "grid-item seven":
      return { row: 2, col: 0 };
      break;

    case "grid-item eight":
      return { row: 2, col: 1 };
      break;

    case "grid-item nine":
      return { row: 2, col: 2 };
      break;

    default:
      break;
  }
}

function displayMessage(message) {
  // Get modal and trigger button elements
  const modal = document.getElementById("modal");
  const closeButton = document.querySelector(".close-button");

  const title = document.getElementById("modal-title");
  const messageParagraph = document.getElementById("modal-message");

  if (message.includes("draw")) {
    title.innerHTML = "Good Game.";
    messageParagraph.innerHTML = message;
  } else if (message.includes("Wins!!")) {
    title.innerHTML = "Congratulations!";
    messageParagraph.innerHTML = message;
  } else {
    title.innerHTML = "5 Points Reached!";
    messageParagraph.innerHTML = message;
  }

  modal.style.display = "flex"; // Show modal

  // Close the modal
  closeButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal
    game.resetBoard();
  });

  // Close the modal when clicking outside the content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      game.resetBoard();
    }
  });
}

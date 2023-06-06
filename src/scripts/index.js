const board = document.querySelector('.board')

const COLUNM = 10;
const ROW = 20;

let playField = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
];

// Game speed
let gameSpeed = 500;

// Tetro
let activeTetro = {
  x: 5,
  y: 0,
  shape: [
    [1,1,1],
    [1,1,1],
    [1,1,1],
  ],
}


// Draw
function draw () {
  let boardInner = ''
  for (let y = 0; y < ROW; y++) {
    for (let x = 0; x < COLUNM; x++) {
      if (playField[y][x] === 1) {
        boardInner += `<div class='cell cell--move'></div>`
      } else if (playField[y][x] === 2 ) {
        boardInner += `<div class='cell cell--fixed'></div>`
      } else {
        boardInner += `<div class='cell'></div>`
      }
    }
  }
  board.innerHTML = boardInner;
}

// Tetro
function addActiveTetro() {
  removeActiveTetro()
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      if (activeTetro.shape[y][x] === 1) {
        playField[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x]
      }
    }
  }
}

function removeActiveTetro() {
  for (let y = 0; y < playField.length; y++) {
    for (let x = 0; x < playField[y].length; x++) {
      if (playField[y][x] === 1) {
        playField[y][x] = 0;
      }
    }
  }
}

// canMove
function checkCollisions() {
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      if ( // Can Move
        activeTetro.shape[y][x] === 1 &&
        (
          playField[activeTetro.y + y] === undefined ||
          playField[activeTetro.y + y][activeTetro.x + x] === undefined
        )) {
        return true
      }
    }
  }
  return false
}

// Full Line
function checkFullesLine() {
  let canRemoveLine = true
  for (let y = 0 ; y < playField.length; y++) {
    for (let x = 0; x < playField[y].length; x++) {
      if (playField[y][x] !== 2) {
        canRemoveLine = false
        break;
      }
    }
    if (canRemoveLine) {
      playField.splice(y, 1)
      playField.unshift([0,0,0,0,0,0,0,0,0,0])
    }
  canRemoveLine = true
  }
}

// Fixed
function fixedTetro() {
  for (let y = 0 ; y < playField.length; y++) {
    for (let x = 0; x < playField[y].length; x++) {
      if (playField[y][x] === 1) {
        playField[y][x] = 2;
      }
    }
  }
  checkFullesLine()
  checkFullesLine()
  checkFullesLine()
  checkFullesLine()

  activeTetro.y = 0

  // playField[0] = [0,1,1,0,0,0,0,0,0,0]
  // playField[1] = [0,1,1,0,0,0,0,0,0,0]
}


// onKeyDown
document.addEventListener('keydown', function(event) {
  if (event.code == "ArrowLeft") {
    activeTetro.x -= 1;
    if (checkCollisions()) {
      activeTetro.x += 1;
    }
  } else if (event.code == "ArrowRight") {
    activeTetro.x += 1;
    if (checkCollisions()) {
      activeTetro.x -= 1;
    }
  } else if (event.code == "ArrowDown") {
    activeTetro.y += 1;
    if (checkCollisions()) {
      activeTetro.y -= 1;
      fixedTetro()
    }
  }
  addActiveTetro()
  draw()
});

// Start
draw()
function startGame() {
  activeTetro.y += 1;
    if (checkCollisions()) {
      activeTetro.y -= 1;
      fixedTetro()
    }
  addActiveTetro()
  draw()
  setTimeout(startGame, 500)
}

startGame()

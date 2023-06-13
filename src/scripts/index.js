const board = document.querySelector('.board');
const preview = document.querySelector('.preview');
const lavel = document.querySelector('.lavel');
const score = document.querySelector('.score');


let curentLavel = 1;
let curentScore = 0;
// Game speed
let gameSpeed = 1000;

const TETROS_NAME = 'OTSZLJI';
const TETROS = {
  O: [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  I: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
}
let playFieldt = Array(20).fill(Array(10).fill(0))

let playField = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let previewField = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]




// Tetro
let nextTetro = [getNewTetro()]

let activeTetro = {
  x: 5,
  y: 0,
  shape: []
}


// Draw
function draw() {
  let boardInner = ''
  for (let y = 0; y < playField.length; y++) {
    for (let x = 0; x < playField[y].length; x++) {
      if (playField[y][x] === 1) {
        boardInner += `<div class='cell cell--move'></div>`
      } else if (playField[y][x] === 2) {
        boardInner += `<div class='cell cell--fixed'></div>`
      } else {
        boardInner += `<div class='cell'></div>`
      }
    }
  }
  board.innerHTML = boardInner;
}

// preview Draw
function previewDraw() {
  previewTetro()
  let previewInner = ''
  for (let y = 0; y < previewField.length; y++) {
    for (let x = 0; x < previewField[y].length; x++) {
      if (previewField[y][x] === 1) {
        previewInner += `<div class='cell cell--move'></div>`
      } else {
        previewInner += `<div class='cell'></div>`
      }
    }
  }
  preview.innerHTML = previewInner;
}


// Tetro
function getNewTetro() {
  const random = Math.floor(Math.random() * 7)
  return TETROS[TETROS_NAME[random]]
}

// Tetro Preview
function previewTetro() {
  removeTetro(previewField)
  let newTetro = getNewTetro()
  for (let y = 0; y < newTetro.length; y++) {
    for (let x = 0; x < newTetro[y].length; x++) {
      if (newTetro[y][x] === 1) {
        previewField[y][x] = 1
      }
    }
  }
}


// Tetro Render
function rendTetro(src = previewField) {
  activeTetro.shape = [...src]
  activeTetro.y = 0
  activeTetro.x = Math.floor((playField[0].length - activeTetro.shape[0].length) / 2)
}


// Tetro Add
function addActiveTetro() {
  removeTetro(playField)
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      if (activeTetro.shape[y][x] === 1) {
        playField[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x]
      }
    }
  }
}

function removeTetro(field) {
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if (field[y][x] === 1) {
        field[y][x] = 0;
      }
    }
  }
}


// Rotate
function rotateTetro() {
  const activeTetroBefore = activeTetro.shape
  activeTetro.shape = activeTetro.shape[0].map((val, index) =>
    activeTetro.shape.map((row) => row[index]).reverse()
  );
  if (checkCollisions()) {
    activeTetro.shape = activeTetroBefore
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
          playField[activeTetro.y + y][activeTetro.x + x] === undefined ||
          playField[activeTetro.y + y][activeTetro.x + x] === 2
        )) {
        return true
      }
    }
  }
  return false
}

// Move Tetro Down
function moveTetroDown() {
  activeTetro.y += 1;
  if (checkCollisions()) {
    activeTetro.y -= 1;
    fixedTetro()
    removeFullLines()
    rendTetro()
    previewDraw()
  }
}

// Tetro Drop
function dropTetro() {
  for (let i = activeTetro.y; i < playField.length; i++) {
    activeTetro.y += 1;
    if (checkCollisions()) {
      activeTetro.y -= 1;
    }
  }
}

// Full Line
function removeFullLines() {
  let canRemoveLine = true
  let filedLines = 0;
  for (let y = 0; y < playField.length; y++) {
    for (let x = 0; x < playField[y].length; x++) {
      if (playField[y][x] !== 2) {
        canRemoveLine = false
        break;
      }
    }
    if (canRemoveLine) {
      playField.splice(y, 1)
      playField.unshift(Array(10).fill(0))
      filedLines++
    }
    canRemoveLine = true
  }
  switch (filedLines) {
    case 1:  // if (x === 'value1')
      curentScore += 10
      break

    case 2:  // if (x === 'value2')
      curentScore += 10 * 2.5
      break

    case 3:  // if (x === 'value2')
      curentScore += 10 * 5
      break

    case 4:  // if (x === 'value2')
      curentScore += 10 * 10
      break

    default:
      curentScore += 0
  }
  score.innerText = curentScore
  leles()
}

// Fixed
function fixedTetro() {
  for (let y = 0; y < playField.length; y++) {
    for (let x = 0; x < playField[y].length; x++) {
      if (playField[y][x] === 1) {
        playField[y][x] = 2;
      }
    }
  }
}

// Уровни
function leles() {
  if (curentScore >= Infinity) {
    curentLavel = 10
    gameSpeed = 100
  } else if (curentScore >= 2000) {
    curentLavel = 9
    gameSpeed = 200
  } else if (curentScore >= 1500) {
    curentLavel = 8
    gameSpeed = 300
  } else if (curentScore >= 900) {
    curentLavel = 7
    gameSpeed = 400
  } else if (curentScore >= 600) {
    curentLavel = 6
    gameSpeed = 500
  } else if (curentScore >= 400) {
    curentLavel = 5
    gameSpeed = 600
  } else if (curentScore >= 250) {
    curentLavel = 4
    gameSpeed = 700
  } else if (curentScore >= 150) {
    curentLavel = 3
    gameSpeed = 800
  } else if (curentScore >= 50) {
    curentLavel = 2
    gameSpeed = 900
  }
  lavel.innerText = curentLavel
}

// Проигрышь
function gemaOver() {
  for (let i = 0; i < playField[0].length; i++) {
    if (playField[0][i] === 2) {
      console.log('gameOver');
      activeTetro.shape[0][i] = 0
      return gameSpeed = 100000
    }
  }
}


// Button
document.addEventListener('click', function (event) {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  } else if (event.target.id == "button-left") {
    activeTetro.x -= 1;
    if (checkCollisions()) {
      activeTetro.x += 1;
    }
  } else if (event.target.id == "button-right") {
    activeTetro.x += 1;
    if (checkCollisions()) {
      activeTetro.x -= 1;
    }
  } else if (event.target.id == "button-rotate") {
    rotateTetro()
  } else if (event.target.id == "button-down") {
    moveTetroDown();
  }
  addActiveTetro()
  draw()
})



// KeyDown
document.addEventListener('keydown', function (event) {
  if (event.code == "ArrowLeft" || event.code == "KeyS") {
    activeTetro.x -= 1;
    if (checkCollisions()) {
      activeTetro.x += 1;
    }
  } else if (event.code == "ArrowRight" || event.code == "KeyF") {
    activeTetro.x += 1;
    if (checkCollisions()) {
      activeTetro.x -= 1;
    }
  } else if (event.code == "ArrowUp" || event.code == "KeyE") {
    rotateTetro()
  } else if (event.code == "ArrowDown" || event.code == "KeyD") {
    moveTetroDown();
  } else if (event.code == "Space") {
    dropTetro()
  }
  addActiveTetro()
  draw()
});

// Start
function startGame() {
  draw()
  rendTetro(getNewTetro())
  previewDraw()
  processGame()
}
function processGame() {
  moveTetroDown()
  addActiveTetro()
  draw()
  gemaOver()
  setTimeout(processGame, gameSpeed)
}

startGame()


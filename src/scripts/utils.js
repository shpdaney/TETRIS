

let curentLavel = 1;
let curentScore = 0;
let gameSpeed = 1000;

// Матрица 20х10
// export let playField = new Array(20).fill(0).map(x => Array(10).fill(0))
export let playField = []
export const  genPlayField = () => playField = new Array(20).fill(0).map(x => Array(10).fill(0))

export const TETROS_NAME = 'OTSZLJI';
export const TETROS = {
  0: [ // O
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ],
  1: [ // T
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  2: [ // S
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  3: [ // Z
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  4: [ // L
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  5: [ // J
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  6: [ // I
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
}

// Случайная Фигура
export function getNewTetro() {
  const random = Math.floor(Math.random() * Object.keys(TETROS).length)
  return TETROS[random]
  // return TETROS[TETROS_NAME[random]]
}

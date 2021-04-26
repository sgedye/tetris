
import { PlayerProps, TETROMINOS_TYPE, Cell, TetrominosShape } from "../types"

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = (): Cell[][] => {
  return Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']))
}

export const checkCollision = (player: PlayerProps, stage: Cell[][], position: ({ x: number, y: number })): boolean => {
  const { x: playerX, y: playerY } = player.position || {}
  const { x: moveX, y: moveY } = position || {}
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      if (player.tetromino[y][x] !== 0) {
        // Check inside game area, and not moving to a blocked cell
        if (!stage[y + playerY + moveY] ||
          !stage[y + playerY + moveY][x + playerX + moveX] ||
          stage[y + playerY + moveY][x + playerX + moveX][1] !== 'clear'
        ) {
          return true
        }
      }
    }
  }
  return false
}


export const TETROMINOS: {
  0: {
    shape: TetrominosShape,
    color: string;
  },
  I: {
    shape: TetrominosShape,
    color: string;
  },
  J: {
    shape: TetrominosShape,
    color: string;
  },
  L: {
    shape: TetrominosShape,
    color: string;
  },
  O: {
    shape: TetrominosShape,
    color: string;
  },
  S: {
    shape: TetrominosShape,
    color: string;
  },
  T: {
    shape: TetrominosShape,
    color: string;
  },
  Z: {
    shape: TetrominosShape,
    color: string;
  },
} = {
  0: { shape: [[0]], color: '0,0,0' },
  I: { shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]], color: '80,227,230' },
  J: { shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]], color: '36,95,223' },
  L: { shape: [[0, 'L', 0], [0, 'L', 0], [0, 'L', 'L']], color: '223,173,36' },
  O: { shape: [['O', 'O'], ['O', 'O']], color: '223,217,36' },
  S: { shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]], color: '48,211,56' },
  T: { shape: [[0, 0, 0], ['T', 'T', 'T'], [0, 'T', 0]], color: '132,51,198' },
  Z: { shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]], color: '227,78,78' },
}

export const randomTetromino = (): TETROMINOS_TYPE => {
  const randomNumber = Math.floor(Math.random() * (Object.keys(TETROMINOS).length - 1));
  switch (randomNumber) {
    case 0:
      return TETROMINOS['I'];
    case 1:
      return TETROMINOS['J'];
    case 2:
      return TETROMINOS['L'];
    case 3:
      return TETROMINOS['O'];
    case 4:
      return TETROMINOS['S'];
    case 5:
      return TETROMINOS['T'];
    case 6:
      return TETROMINOS['Z'];
    default:
      console.error('Invalid Random Tetromino', randomNumber)
      return TETROMINOS[0];
  }
}


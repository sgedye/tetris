import { TETROMINOS } from "../utils"

// STAGE
export type Stage = Cell[][];

export interface Cell {
  [0]: TetrominoType;
  [1]: "clear" | "merged";
}


// PLAYER
export interface PlayerProps {
  position: Position;
  tetromino: TetrominosShape;
  collided: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export type TetrominosShape = (0 | 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z')[][]


//TETROMINOS

export type TetrominoType = keyof typeof TETROMINOS;
export interface TetrominoInt {
  key: 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z',
}

// type TETROMINOS_TYPE extends object = {
//   key: 0 | 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z',
//   value: {
//     shape: any[];
//     color: string;
//   }
// }

export interface TETROMINOS_TYPE {

  shape: TetrominosShape;
  color: string;

}

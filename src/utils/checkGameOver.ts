import { Cell, TetrominoOptions, TetrominosShape } from "../types";

export const checkGameOver = (stage: Cell[][], nextTetromino: TetrominosShape): boolean => {

  let isGameOver = false;

  nextTetromino.forEach((row: TetrominoOptions[], rowId: number) => row.forEach((cell: TetrominoOptions, colId: number) => {
    if (cell !== 0 && stage[rowId][colId + 4][1] === "merged") {
      isGameOver = true;
    }
  }));

  return isGameOver;
}

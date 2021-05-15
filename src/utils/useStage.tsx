import { useState, useEffect } from "react";

import { createStage } from ".";
import { TetrominoType, PlayerProps, Cell } from "../types";

interface useStageReturn {
  stage: Cell[][];
  setStage: React.Dispatch<React.SetStateAction<Cell[][]>>;
  rowsCleared: number;
}

export const useStage = (
  player: PlayerProps,
  resetPlayer: () => void
): useStageReturn => {
  const [stage, setStage] = useState<Cell[][]>(createStage());
  const [rowsCleared, setRowsCleared] = useState<number>(0);

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = (newStage: Cell[][]) =>
      newStage.reduce((acc: Cell[][], row: Cell[]) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          acc.unshift(new Array(newStage[0].length).fill([0, "clear"]));
          return acc;
        }
        acc.push(row);
        return acc;
      }, [] as Cell[][]);

    const updateStage = (prevStage: Cell[][]) => {
      const newStage: Cell[][] = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // Draw
      player.tetromino.forEach((row: TetrominoType[], y: number) => {
        row.forEach((value: TetrominoType, x: number) => {
          if (value !== 0) {
            newStage[y + player.position.y][x + player.position.x] = [
              value,
              player.collided ? "merged" : "clear",
            ];
          }
        });
      });

      // Check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return { stage, setStage, rowsCleared };
};

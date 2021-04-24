import { useState, useEffect } from "react";

import { createStage, randomTetromino, TETROMINOS, usePlayer } from ".";

import {
  TetrominoType,
  PlayerProps,
  Cell,
  TETROMINOS_TYPE,
  TetrominosShape,
} from "../types";

interface useStageReturn {
  stage: Cell[][];
  setStage: React.Dispatch<React.SetStateAction<Cell[][]>>;
}

export const useStage = (
  player: PlayerProps,
  resetPlayer: () => void
): useStageReturn => {
  const [stage, setStage] = useState<Cell[][]>(createStage());

  useEffect(() => {
    const updateStage = (prevStage: Cell[][]) => {
      const newStage: Cell[][] = prevStage.map((row) =>
        row.map((cell) => {
          return cell[1] === "clear" ? [0, "clear"] : cell;
        })
      );

      // Draw
      player.tetromino.forEach((row: any, y: number) => {
        row.forEach((value: TetrominoType, x: number) => {
          if (value !== 0) {
            newStage[y + player.position.y][x + player.position.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        });
      });

      // Check if we collided
      if (player.collided) {
        resetPlayer();
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return { stage, setStage };
};

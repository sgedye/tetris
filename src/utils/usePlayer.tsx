import { useState, useCallback } from "react";

import { checkCollision, randomTetromino, STAGE_WIDTH, TETROMINOS } from "./";

import { Cell, PlayerProps, Position, TetrominosShape } from "../types";

interface usePlayerReturn {
  player: PlayerProps;
  nextTetromino: TetrominosShape;
  updatePlayerPosition: (position: Position, collided: boolean) => void;
  resetPlayer: () => void;
  playerRotate: (stage: Cell[][]) => void;
}

export const usePlayer = (): usePlayerReturn => {
  const [nextTetromino, setNextTetromino] = useState<TetrominosShape>(
    randomTetromino().shape
  );

  const [player, setPlayer] = useState<PlayerProps>({
    position: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix: TetrominosShape): TetrominosShape => {
    const rotated = matrix.map((_, idx) => matrix.map((col) => col[idx]));
    return rotated.map((row) => row.reverse());
  };

  const playerRotate = (stage: Cell[][]) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player)) as PlayerProps;
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino) as TetrominosShape;

    let storedPosition = clonedPlayer.position.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino);
        clonedPlayer.position.x = storedPosition;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  const updatePlayerPosition = (position: Position, collided: boolean) => {
    return setPlayer((prev) => ({
      ...prev,
      position: {
        x: prev.position.x + position.x,
        y: prev.position.y + position.y,
      },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: nextTetromino,
      collided: false,
    });
    return setNextTetromino(randomTetromino().shape);
  }, [nextTetromino]);

  return {
    player,
    nextTetromino,
    updatePlayerPosition,
    resetPlayer,
    playerRotate,
  };
};

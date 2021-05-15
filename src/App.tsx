import React, { useState } from "react";
import styled from "styled-components";

import { Stage, Display, Buttons, UpNext, Legend } from "./components";

import {
  useStage,
  usePlayer,
  createStage,
  checkCollision,
  useInterval,
  useGameStatus,
} from "./utils";
import { PlayerProps } from "./types";

function App() {
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [gamePaused, setGamePaused] = useState<boolean>(false);
  const [gameSpeed, setGameSpeed] = useState<number>(0);
  const [prePauseSpeed, setPrePauseSpeed] = useState<number>(0);

  const {
    player,
    nextTetromino,
    updatePlayerPosition,
    resetPlayer,
    playerRotate,
  } = usePlayer();

  const { stage, setStage, rowsCleared } = useStage(
    player as PlayerProps,
    resetPlayer as () => void
  );

  const { level, rows, score, setLevel, setRows, setScore } =
    useGameStatus(rowsCleared);

  useInterval(() => {
    drop();

    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setGameSpeed(1000 / (level + 1) + 200);
    }

    //Check gameover
    if (stage[0].filter((cell) => cell[1] === "merged").length > 0) {
      console.log(`¡GAME OVER! --- You scored: ${score} points!`);
      setGameOver(true);
      setGameSpeed(0);
    }
  }, gameSpeed);

  const move = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (gameOver) {
      return;
    }
    if (e.key === "Enter") {
      return pauseGame();
    }
    if (!gamePaused) {
      switch (e.key) {
        case "ArrowLeft":
          moveLaterally(-1);
          break;
        case "ArrowRight":
          moveLaterally(1);
          break;
        case "ArrowDown":
          playerDrop();
          break;
        case "ArrowUp":
          playerRotate(stage);
          break;
        case " ":
          playerDrop(true);
          break;
      }
    }
  };

  const moveLaterally = (dir: number) => {
    if (
      !checkCollision(player, stage, {
        x: dir,
        y: 0,
      })
    ) {
      updatePlayerPosition({ x: dir, y: 0 }, false);
    }
  };

  const startGame = () => {
    // Reset All
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
    setGameSpeed(1200);
    setLevel(0);
    setScore(0);
    setRows(0);
  };

  const pauseGame = () => {
    if (!gamePaused) {
      setGamePaused((prev) => !prev);
      setPrePauseSpeed(gameSpeed);
      setGameSpeed(0);
      return;
    }
    setGamePaused((prev) => !prev);
    return setGameSpeed(prePauseSpeed);
  };

  const drop = (linesToDrop: number = 1) => {
    if (!checkCollision(player, stage, { x: 0, y: linesToDrop })) {
      return updatePlayerPosition({ x: 0, y: linesToDrop }, false);
    }

    updatePlayerPosition({ x: 0, y: linesToDrop - 1 }, true);
  };

  const keyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver && !gamePaused) {
      if (e.key === "ArrowDown" || e.key === " ") {
        setGameSpeed(1000 / (level + 1) + 200);
      }
    }
  };

  const playerDrop = (pressedSpacebar: boolean = false) => {
    setGameSpeed(0);

    if (!pressedSpacebar) {
      return drop();
    }

    let hasCollided = false;
    let next = 0;
    while (!hasCollided) {
      next++;
      if (checkCollision(player, stage, { x: 0, y: next })) {
        hasCollided = true;
      }
    }
    drop(next);
  };

  return (
    <div
      className="my-app p-4"
      role="button"
      tabIndex={0}
      onKeyDown={move}
      onKeyUp={keyUp}
    >
      <div className="w-100">
        <AppTitle>SHAUN'S TETRIS APP</AppTitle>
        <div className="tetris-app">
          <Stage stage={stage} gamePaused={gamePaused} />
          <aside className="w-100 tetris-aside">
            <div className="d-flex flex-column align-items-center justify-content-around mb-3">
              <Display text={`Score:  ${score}`} />
              <Display text={`Rows:  ${rows}`} />
              <Display text={`Level:  ${level}`} />
            </div>
            <Buttons
              gameOver={gameOver}
              gamePaused={gamePaused}
              handleStartGame={startGame}
              handlePauseGame={pauseGame}
              className="d-none d-lg-block mb-4"
            />
            {!gameOver && (
              <UpNextWrapper>
                <UpNext nextTetromino={nextTetromino} gamePaused={gamePaused} />
              </UpNextWrapper>
            )}
            <Legend />
            {gameOver && score !== 0 && (
              <div
                className="bg-warning mx-auto d-flex align-items-center justify-content-center p-5"
                style={{ maxWidth: "20rem", height: "10rem" }}
              >
                <h1 className="text-center text-white mb-0">Game Over</h1>
              </div>
            )}
          </aside>
        </div>
        <div className="d-block d-lg-none">
          <Buttons
            gameOver={gameOver}
            gamePaused={gamePaused}
            handleStartGame={startGame}
            handlePauseGame={pauseGame}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

const AppTitle = styled.h1`
  display: block;
  color: white;
  text-align: center;
  padding: 2rem;
  text-shadow: 2px 2px 2px red;
`;

const UpNextWrapper = styled.div`
  display: none;
  @media screen and (min-width: 576px) {
    display: block;
    margin: 0 0 1.5rem;
    width: 12rem;
  }
  @media screen and (min-width: 992px) {
    margin: 0 auto 1.5rem;
    width: 15rem;
  }
`;

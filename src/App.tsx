import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Stage, Buttons, UpNext, Legend, GameOver } from "./components";

import {
  useStage,
  usePlayer,
  createStage,
  checkCollision,
  useInterval,
  useGameStatus,
} from "./utils";
import { PlayerProps } from "./types";
import { theme } from "./theme";

import arrows from "./assets/gfx/arrows.png";

function App() {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gamePaused, setGamePaused] = useState<boolean>(false);
  const [gameSpeed, setGameSpeed] = useState<number>(0);
  const [prePauseSpeed, setPrePauseSpeed] = useState<number>(0);
  const [highscore, setHighscore] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

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

  useEffect(() => {
    const _highscore = localStorage.getItem("highscore") || "0";
    setHighscore(parseInt(_highscore, 10));
    startGame();
  }, []);

  useInterval(() => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setGameSpeed(1000 / (level + 1) + 200);
    }

    //Check gameover
    if (stage[0].filter((cell) => cell[1] === "merged").length > 0) {
      setGameOver(true);
      setGameSpeed(0);

      if (score > 0 && score > highscore) {
        localStorage.setItem("highscore", `${score}`);
        setHighscore(score);
        setShowConfetti(true);
      }
      return;
    }
    drop();
  }, gameSpeed);

  const move = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (gameOver) {
      if (e.key === "Escape" && gameOver) {
        return startGame();
      }
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
    setShowConfetti(false);
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
    if (!gameOver && !gamePaused && e.key === "ArrowDown") {
      setGameSpeed(1000 / (level + 1) + 200);
    }
  };

  const playerDrop = (pressedSpacebar: boolean = false) => {
    if (!pressedSpacebar) {
      setGameSpeed(0);
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
      <GameOver
        highscore={highscore}
        gameOver={gameOver}
        topScore={showConfetti}
        startNewGame={() => startGame()}
      />
      <div className="w-100">
        <AppTitle>TETRIS APP</AppTitle>
        <div className="tetris-app">
          <Stage stage={stage} gamePaused={gamePaused} />
          <aside className="w-100 tetris-aside">
            <div className="d-flex flex-column align-items-center justify-content-around mb-3">
              <StyledDisplay className="input-group">{`Score:  ${score}`}</StyledDisplay>
              <StyledDisplay className="input-group">{`Rows:   ${rows}`}</StyledDisplay>
              <StyledDisplay className="input-group">{`Level:   ${level}`}</StyledDisplay>
            </div>
            <Buttons
              gameOver={gameOver}
              gamePaused={gamePaused}
              handleStartGame={startGame}
              handlePauseGame={pauseGame}
              className="d-none d-lg-block mb-4"
            />
            <UpNextWrapper>
              <UpNext
                nextTetromino={nextTetromino}
                gamePaused={gamePaused || gameOver}
              />
            </UpNextWrapper>
            <Legend />
            <HighscoreWrapper className="w-100 d-none d-lg-flex flex-column text-center px-5">
              <h2 className="mb-2">Highscore</h2>
              <h2 className="h1 font-weight-bold">
                {highscore.toLocaleString("en")}
              </h2>
            </HighscoreWrapper>
          </aside>
        </div>
        <div className="d-block d-lg-none">
          <div className="d-flex justify-content-around mb-3">
            <Control idx={0} img={arrows} onClick={() => playerRotate(stage)} />
            <Control idx={2} img={arrows} onClick={() => moveLaterally(-1)} />
            <Control idx={3} img={arrows} onClick={() => moveLaterally(1)} />
            <Control idx={1} img={arrows} onClick={() => playerDrop(true)} />
          </div>
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
  padding: 0.5rem;
  text-shadow: 2px 2px 2px ${theme.danger};
  @media screen and (min-width: 576px) {
    padding: 2rem;
  }
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

const HighscoreWrapper = styled.div`
  margin: 0 auto 1.5rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  max-width: 20rem;
  border-radius: 0.25rem;
`;

const StyledDisplay = styled.div`
  background-color: #111;
  border-radius: 1rem;
  max-width: 20rem;
  margin: 0 0 0.5rem 0;
  color: white;
  border: 4px solid grey;
  font-weight: 800;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  text-align: center;
  @media screen and (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Control = styled.button<{ idx: number; img: string }>`
  position: relative;
  display: block;
  width: 75px;
  height: 75px;
  border: 0;
  background-color: transparent;
  border-radius: 1rem;
  padding: 0;
  margin: 0.25rem;
  background-image: url(${(p) => p.img});
  background-size: 100% 400%;
  background-repeat: no-repeat;
  background-position: 0 calc(-75px * ${(p) => p.idx});
  transition: 50ms all cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: translate(0, 0);
  &:active {
    transform: translate(1px, 1px);
  }
  &:focus {
    outline: none;
  }
`;

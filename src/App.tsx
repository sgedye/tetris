import { useState } from "react";
import { Stage, Display } from "./components";

import {
  useStage,
  usePlayer,
  createStage,
  checkCollision,
  useInterval,
} from "./utils";
import { PlayerProps, Position } from "./types";

function App() {
  const [gameOver, setGameOver] = useState<boolean>(false); // game in progress, disable button.
  const [gameSpeed, setGameSpeed] = useState<number>(0);

  const {
    player,
    updatePlayerPosition,
    resetPlayer,
    playerRotate,
  } = usePlayer();

  const { stage, setStage } = useStage(
    player as PlayerProps,
    resetPlayer as () => void
  );

  useInterval(() => drop(), gameSpeed);

  const move = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!gameOver) {
      switch (e.key) {
        case "ArrowLeft":
          moveLaterally(-1);
          break;
        case "ArrowRight":
          moveLaterally(1);
          break;
        case "ArrowDown":
          dropPlayer();
          break;
        case "ArrowUp":
          playerRotate(stage);
          break;
        case " ":
          dropPlayer();
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
    //reset all
    console.log("reset");
    createStage();
    resetPlayer();
    setGameSpeed(300);
    setGameOver(false);
  };

  const pauseGame = () => {
    gameSpeed ? setGameSpeed(0) : setGameSpeed(300);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      return updatePlayerPosition({ x: 0, y: 1 }, false);
    }


    if (player.position.y < 1) {
      console.log("GAME OVER");
      setGameOver(true);
      setGameSpeed(0);
    }

    updatePlayerPosition({ x: 0, y: 0 }, true);
  };

  const keyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      if (e.key === "ArrowDown") {
        setGameSpeed(300);
        // console.log("intervall-on");
      }
    }
  };

  const dropPlayer = () => {
    setGameSpeed(0);
    return drop();
    // while (!checkCollision(player, stage, { x: 0, y: 1 })) {
    //   updatePlayerPosition({ x: 0, y: 1 }, false);
    // }
  };

  console.log("re-render");
  return (
    <div
      className="tetris-app"
      role="button"
      tabIndex={0}
      onKeyDown={move}
      onKeyUp={keyUp}
    >
      <Stage stage={stage} />
      <aside className="row score-area">
        {gameOver ? <p>gameover</p> : null}
        <Display text="Score" />
        <Display text="Rows" />
        <Display text="Level" />
        <div className="col-6 col-md-12">
          <button
            // disabled={!gameOver}
            className="btn btn-block start-btn"
            onClick={startGame}
          >
            Start Again
          </button>
          <button
            // disabled={!gameOver}
            className="btn btn-block"
            onClick={pauseGame}
          >
            Pause Game
          </button>
        </div>
      </aside>
    </div>
  );
}

export default App;

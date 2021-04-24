import { useState } from "react";
import { Stage, Display } from "./components";

import { useStage, usePlayer, createStage, checkCollision } from "./utils";
import { PlayerProps, Position } from "./types";

function App() {
  const [gameOver, setGameOver] = useState(false); // game in progress, disable button.
  const [gameSpeed, setGameSpeed] = useState(null);

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

  console.log("re-render");

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
          dropPlayer(false);
          break;
        case "ArrowUp":
          playerRotate(stage);
          break;
        case " ":
          dropPlayer(true);
          console.log(`--${e.key}--`);
          break;
      }
    }
  };

  const moveLaterally = (direction: number) => {
    if (
      !checkCollision(player, stage, {
        x: direction,
        y: 0,
      })
    ) {
      updatePlayerPosition({ x: direction, y: 0 }, false);
    }
  };

  const startGame = () => {
    //reset all
    console.log("reset");
    createStage();
    resetPlayer();
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1 }, false);
    } else {
      if (player.position.y < 1) {
        console.log("GAME OVER");
        setGameOver(true);
        setGameSpeed(null);
      }
      updatePlayerPosition({ x: 0, y: 0 }, true);
    }
  };

  const dropPlayer = (hasPressedSpace: boolean) => {
    if (!hasPressedSpace) {
      return drop();
    }
    while (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1 }, false);
    }
  };

  console.log("lya", player);

  return (
    <div className="tetris-app" role="button" tabIndex={0} onKeyDown={move}>
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
        </div>
      </aside>
    </div>
  );
}

export default App;

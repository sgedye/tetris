import { StyledTetris, Overlay } from ".";
import { TetrominosShape, Cell } from "../types";
import CellComponent from "./Cell";
import { useGlobal } from "../utils";
interface UpNextProps {
  nextTetromino: TetrominosShape;
  gamePaused: boolean;
}

const WIDTH = 4;
const miniStage = Array.from(Array(WIDTH), () =>
  new Array(WIDTH).fill([0, "clear"])
);

export const UpNext: React.FC<UpNextProps> = ({
  nextTetromino,
  gamePaused,
}) => {
  const [state] = useGlobal();
  const { gameOver, gameSpeed, highscore } = state;

  return (
    <div>
      <h2 className="text-white">{gameOver ? "game over" : "nah, play on"}</h2>
      <h2 className="text-white">{gameSpeed}</h2>
      <h2 className="text-white">{highscore}</h2>
      <StyledTetris width={WIDTH}>
        {miniStage.map((row: Cell[], rowId: number) =>
          row.map((cell: Cell, cellId: number) => {
            if (nextTetromino[rowId] !== undefined) {
              if (!!nextTetromino[rowId][cellId]) {
                return (
                  <CellComponent
                    key={`${rowId}-${cellId}`}
                    type={nextTetromino[rowId][cellId]}
                  />
                );
              }
            }
            return <CellComponent key={`${rowId}-${cellId}`} type={0} />;
          })
        )}
        {gamePaused && <Overlay />}
      </StyledTetris>
    </div>
  );
};

import styled from "styled-components";

import CellComponent from "./Cell";
import { Cell } from "../types";

interface StageProps {
  stage: Cell[][];
}

export const Stage: React.FC<StageProps> = ({ stage = [] }) => {
  const width = stage.length ? stage[0].length : 0;
  const height = stage.length;
  return (
    <div className="game-area">
      <StyledTetris width={width} height={height}>
        {stage.map((row: Cell[], rowId: number) =>
          row.map((cell: Cell, cellId: number) => (
            <CellComponent key={`${rowId}-${cellId}`} type={cell[0]} />
          ))
        )}
      </StyledTetris>
    </div>
  );
};

const StyledTetris = styled.div<{ width: number; height: number }>`
  display: grid;
  /* grid-template-rows: repeat(
    ${(props) => props.height},
    calc(2vw / ${(props) => props.width})
  ); */
  grid-template-rows: repeat(20, 3vw);
  grid-template-columns: repeat(${(props) => props.width}, auto);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  height: 100%;
  max-width: 40vw;
  background: #333;
`;

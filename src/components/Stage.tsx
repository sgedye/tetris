import styled from "styled-components";

import CellComponent from "./Cell";
import { Cell } from "../types";
import { theme } from "../theme";

interface StageProps {
  stage: Cell[][];
  gamePaused: boolean;
}

export const Stage: React.FC<StageProps> = ({ stage = [], gamePaused }) => {
  const width = stage.length ? stage[0].length : 0;
  return (
    <StyledTetris width={width}>
      {stage.map((row: Cell[], rowId: number) =>
        row.map((cell: Cell, cellId: number) => (
          <CellComponent key={`${rowId}-${cellId}`} type={cell[0]} />
        ))
      )}
      {gamePaused && <Overlay />}
    </StyledTetris>
  );
};

export const StyledTetris = styled.div<{ width: number }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${(p) => p.width}, 1fr);
  grid-gap: 1px;
  background: #333;
  border: 6px solid grey;
  width: 100%;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${theme.dark};
`;

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
    <StyledTetris width={width} height={height}>
      {stage.map((row: Cell[], rowId: number) =>
        row.map((cell: Cell, cellId: number) => (
          <CellComponent key={`${rowId}-${cellId}`} type={cell[0]} />
        ))
      )}
    </StyledTetris>
  );
};

const StyledTetris = styled.div<{ width: number; height: number }>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1px;
  background: #333;
  border: 6px solid grey;
  width: 100%;
`;

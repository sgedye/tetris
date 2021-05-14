import { memo } from "react";
import styled from "styled-components";

import { TETROMINOS } from "../utils/gameHelpers";
import { TetrominoType } from "../types";

const CellComponent: React.FC<{ type: TetrominoType }> = ({ type }) => {
  return <StyledCell color={TETROMINOS[type].color} />;
};

export default memo(CellComponent);

const StyledCell = styled.div<{ color: string }>`
  aspect-ratio: 1;
  background: rgba(${(p) => p.color}, 0.8);
  border: 0.5rem solid;
  border-bottom-color: rgba(${(p) => p.color}, 0.1);
  border-right-color: rgba(${(p) => p.color}, 1);
  border-top-color: rgba(${(p) => p.color}, 1);
  border-left-color: rgba(${(p) => p.color}, 0.3);
`;

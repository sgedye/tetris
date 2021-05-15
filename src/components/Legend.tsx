import styled from "styled-components";
import keyboard from "../assets/gfx/keyboard.png";

const data: string[] = [
  "Rotate tetromino",
  "Move left one square",
  "Move right one square",
  "Move tetromino down",
  "Pause / resume",
  "Drop tetromino",
];

export const Legend: React.FC<{}> = () => {
  return (
    <LegendBlock className="d-none d-lg-block rounded mx-auto mb-4">
      <StyledList>
        {data.map((datum, idx) => (
          <StyledListItem key={idx}>
            <LegendIcon
              className="d-inline-block mr-3"
              idx={idx}
              img={keyboard}
            ></LegendIcon>
            <strong>{datum}</strong>
          </StyledListItem>
        ))}
      </StyledList>
    </LegendBlock>
  );
};

const LegendBlock = styled.div`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  max-width: 20rem;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid rgba(0, 0, 0, 0.75);
  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }
`;

const LegendIcon = styled.span<{ idx: number; img: string }>`
  display: block;
  width: 100px;
  height: 40px;
  background-image: url(${(p) => p.img});
  background-size: 100% 600%;
  background-repeat: no-repeat;
  background-position: 0 calc(-40px * ${(p) => p.idx});
  max-height: 100%;
`;

import styled from "styled-components";
import ReactConfetti from "react-confetti";
import { theme } from "../theme";

interface GameOverProps {
  highscore: number;
  gameOver: boolean;
  topScore: boolean;
  startNewGame: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  highscore,
  gameOver,
  topScore,
  startNewGame,
}) => {
  return (
    <GameOverOverlay active={topScore || gameOver}>
      {topScore && <ReactConfetti />}
      <HighscoreBox active={topScore || gameOver}>
        <h1>{topScore ? "Congratulations!" : "Game Over!"}</h1>
        <h2>
          {topScore
            ? "on your new highscore"
            : "Bad luck, the score to beat is"}
        </h2>
        <Highscore>{highscore.toLocaleString("en")}</Highscore>
        <StyledButton className="btn btn-dark" onClick={startNewGame}>
          <strong>{topScore ? "Thanks" : "Try Again"}</strong>
        </StyledButton>
      </HighscoreBox>
    </GameOverOverlay>
  );
};

const GameOverOverlay = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: ${(p) => (p.active ? 1 : -1)};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
`;

const HighscoreBox = styled.div<{ active: boolean }>`
  max-width: 50%;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 5;
  border-radius: 1rem;
  transition: all 1500ms cubic-bezier(0.34, 1.56, 0.64, 1);
  color: ${(p) => (p.active ? theme.light : theme.dark)};
  background-color: ${(p) =>
    p.active ? `${theme.dark}dd` : `${theme.light}dd`};
  text-shadow: 2px 2px 2px ${(p) => (p.active ? "black" : theme.light)};
  transform: ${(p) => (p.active ? "scale(1.5)" : "scale(0)")};
  h1 {
    font-size: 1.75rem;
  }
  h2 {
    font-size: 1.25rem;
  }
  @media screen and (min-width: 992px) {
    padding: 3rem 4rem;
    h1 {
      font-size: 3rem;
    }
    h2 {
      font-size: 2rem;
    }
  }
`;

const StyledButton = styled.button`
  border: 2px solid ${theme.light};
  &:hover {
    border: 2px solid ${theme.light};
    filter: invert(1);
  }
  @media screen and (min-width: 992px) {
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
  }
`;

const Highscore = styled.h1`
  font-size: 3em;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 2px ${theme.danger}, -1px -1px 5px ${theme.danger};
  @media screen and (min-width: 992px) {
    font-size: 5em;
  }
`;

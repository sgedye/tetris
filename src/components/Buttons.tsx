import classnames from "classnames";
import styled from "styled-components";
import { theme } from "../theme";

interface ButtonsProps {
  gameOver: boolean;
  gamePaused: boolean;
  className?: string;
  handleStartGame: () => void;
  handlePauseGame: () => void;
}

export const Buttons: React.FC<ButtonsProps> = ({
  gameOver,
  gamePaused,
  className = "",
  handleStartGame,
  handlePauseGame,
}) => {
  return (
    <div
      className={classnames("mx-auto", className)}
      style={{ maxWidth: "20rem" }}
    >
      <StartButton
        className={`btn btn-block mb-2 ${
          gameOver ? "btn-primary" : "btn-secondary"
        }`}
        disabled={gamePaused}
        onClick={handleStartGame}
      >
        Start Again
      </StartButton>
      <PauseButton
        active={gamePaused}
        className={classnames("btn btn-block", {
          "d-none": gameOver,
        })}
        onClick={handlePauseGame}
      >
        {gamePaused ? "Resume Game" : "Pause Game"}
      </PauseButton>
    </div>
  );
};

const StartButton = styled.button`
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 1.25rem;
  border-radius: 1rem;
`;

const PauseButton = styled(StartButton)<{ active: boolean }>`
  border: 2px solid ${theme.warning};
  color: ${(p) => (p.active ? theme.dark : theme.warning)};
  background-color: ${(p) => (p.active ? theme.warning : "transparent")};
`;

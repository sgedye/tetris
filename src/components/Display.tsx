import styled from "styled-components";

interface DisplayProps {
  gameOver?: boolean;
  text: string;
}

export const Display: React.FC<DisplayProps> = ({
  gameOver = false,
  text = "",
}) => {
  return (
    <StyledDisplay className="input-group">
      <StyledText className="input-group-prepend" id="basic-addon3">
        {text}
      </StyledText>
      <label htmlFor={text} className="sr-only">
        {text}
      </label>
      <StyledInput
        type="text"
        className="form-control"
        id={text}
        aria-describedby="basic-addon3"
      />
    </StyledDisplay>
  );
};

const StyledDisplay = styled.div`
  background-color: #111;
  border-radius: 1rem;
  max-width: 20rem;
  padding: 0;
  margin: 0 0 0.5rem 0;
`;

const StyledText = styled.span`
  color: white;
  font-weight: 800;
  font-size: 1rem;
  padding: 0.75rem;
  text-align: center;
  background-color: transparent;
  border: 4px solid grey;
  border-right: none;
  border-radius: 1rem 0 0 1rem;
  @media screen and (min-width: 768px) {
    font-size: 1.25rem;
  }
`;
const StyledInput = styled.input`
  color: white;
  font-weight: 800;
  font-size: 1rem;
  padding: 0.75rem;
  text-align: center;
  background-color: transparent;
  border: 4px solid grey;
  border-right: none;
  border-radius: 1rem 0 0 1rem;
  padding-left: 0;
  border: 4px solid grey;
  border-left: none;
  border-radius: 0 1rem 1rem 0;
  @media screen and (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

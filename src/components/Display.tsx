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
    <div className="col-6 col-md-12">
      <StyledDisplay className="input-group">
        <div className="input-group-prepend">
          <StyledText className="input-group-text" id="basic-addon3">
            {text}:
          </StyledText>
        </div>
        <StyledInput
          type="text"
          className="form-control"
          id={text}
          aria-describedby="basic-addon3"
          value={300}
          onChange={() => console.log("changing....")}
        />
      </StyledDisplay>
      <label htmlFor={text} className="sr-only">
        {text}
      </label>
    </div>
  );
};

const StyledDisplay = styled.div`
  background-color: #111;
  border-radius: 1rem;
  // width: 100%;
  max-width: 200px;
  padding: 0;
  margin-bottom: 0.5rem;
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

import styled from "styled-components";

export const StyledButton = styled.button`
  margin: 3%;
  padding: 3% 6%;
  border: none;
  color: #e5e6df;
  border: 2px solid black;
  background-color: #5a5c52;
  border-radius: 20px;
  font-size: 1.1rem;
  transition: 0.1s linear;
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: #777a6c;
    }
`;
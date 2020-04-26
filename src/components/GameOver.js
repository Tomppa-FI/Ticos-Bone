import React from "react";
import styled from "styled-components";
import { StyledButton } from "../styles/Buttons";

const Wrapper = styled.div`

`;

export default ({setGameState}) => {
    return (
        <Wrapper>
            <StyledButton onClick={() => setGameState("MainMenu")}>New Game</StyledButton>
        </Wrapper>
    )
}
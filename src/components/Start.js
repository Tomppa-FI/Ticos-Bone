import React from "react";
import styled from "styled-components";
import { Title, SubTitle } from "../styles/Typography";
import { StyledButton } from "../styles/Buttons";

const Wrapper = styled.div`
    height: 100%:
    width: 100%;
`;

export default ({setMenuState, setGameState}) => {
    return (
        <Wrapper>
            <Title>Tico's Bone</Title>
            <SubTitle>A Zelda-Inspired browser game utilizing React.</SubTitle>
            <StyledButton onClick={() => setGameState("Game")}>Play Game</StyledButton>
            <StyledButton onClick={() => setMenuState("Info")}>Information</StyledButton>
        </Wrapper>
    )
}
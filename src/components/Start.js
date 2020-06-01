import React from "react";
import styled from "styled-components";
import { Title, Paragraph } from "../styles/Typography";
import { StyledButton } from "../styles/Buttons";

const Wrapper = styled.div`
    height: 100%:
    width: 100%;
`;

export default ({setMenuState, setGameState}) => {
    return (
        <Wrapper>
            <Title>Tico's Quest</Title>
            <Paragraph>
                Last Summer, Tico buried his favourite bone in the forest for safekeeping.
                <br />
                Now that Summer has come again, it's time to dig it up.
                <br />
                Unfortunately for Tico, he can't remember how to reach his bone!
                <br />
                To make matters worse, the world has since become infested with Monsters.
                <br />
                Can you help Tico navigate the deadly maze, collect coins along the way, and find his bone?
                <br />
            </Paragraph>
            <StyledButton onClick={() => setGameState("Game")}>Play Game</StyledButton>
            <StyledButton onClick={() => setMenuState("Info")}>Information</StyledButton>
        </Wrapper>
    )
}
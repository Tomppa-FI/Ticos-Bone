import React from "react";
import styled from "styled-components";
import { Title, Paragraph, StyledA } from "../styles/Typography";
import { StyledButton } from "../styles/Buttons";

const Wrapper = styled.div`

`;

export default ({ setMenuState }) => {
    return (
        <Wrapper>
            <Title>Technical Information</Title>
            <Paragraph>
                This project was built using React, and inspired by Zelda: A link to the past.
                <br />
            
            </Paragraph>
            <Paragraph>
                Attribution:
                Various Tiles, Monsters/Dog images: 
                <StyledA href="https://pipoya.itch.io"> Pipoya</StyledA>
            </Paragraph>

            <StyledButton onClick={() => setMenuState("Start")}>Return to Start Menu</StyledButton>
        </Wrapper>
    )
}
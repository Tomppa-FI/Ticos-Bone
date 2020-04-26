import React from "react";
import styled from "styled-components";
import { StyledButton } from "../styles/Buttons";

const Wrapper = styled.div`

`;

export default ({ setMenuState }) => {
    return (
        <Wrapper>
            This will be for information.
            <StyledButton onClick={() => setMenuState("Start")}>Return</StyledButton>
        </Wrapper>
    )
}
import React from "react";
import styled from "styled-components";
import { StyledButton } from "../styles/Buttons";
import { usePlayerStatus } from "./App";

import { DispatchMap } from "../Constants";

const Wrapper = styled.div`

`;

export default ({setGameState}) => {
    const {playerStatus, dispatch} = usePlayerStatus();

    return (
        <Wrapper>
            <StyledButton onClick={() => {
                dispatch({
                    type: DispatchMap.RESET_GAME,
                })
                setGameState("MainMenu")
            }}>New Game</StyledButton>
        </Wrapper>
    )
}
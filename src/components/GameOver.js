import React from "react";
import styled from "styled-components";
import { StyledButton } from "../styles/Buttons";
import { Paragraph, Title } from "../styles/Typography";
import { usePlayerStatus } from "./App";

import { DispatchMap } from "../Constants";

const Wrapper = styled.div`
  width: 800px;
  height: 400px;
  background-color: #323b33;
  text-align: center;
  border: 3px solid #323b33;
  border-radius: 15px;
  padding: 5px;
`;

export default ({setGameState}) => {
    const {playerStatus, dispatch} = usePlayerStatus();
    const score = Math.round((1000 + (playerStatus.playerCoins * 100)) / (playerStatus.playerMoves / playerStatus.playerHealth));
    return (
        <Wrapper>
            <Title>Congratulations, you found Tico's Bone!</Title>
            <Paragraph>
            More levels coming soon. In the meantime, why not play again?
            </Paragraph>
            <Paragraph>
                Final Score: {score}
            </Paragraph>
            <StyledButton onClick={() => {
                dispatch({
                    type: DispatchMap.RESET_GAME,
                })
                setGameState("MainMenu")
            }}>New Game</StyledButton>
        </Wrapper>
    )
}
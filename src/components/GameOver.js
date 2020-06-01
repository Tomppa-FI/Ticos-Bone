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
    const score = Math.round((1000 + (playerStatus.playerCoins * 1000)) / (playerStatus.playerMoves / playerStatus.playerHealth));
    return (
        <Wrapper>
            {playerStatus.playerHealth !== 0 ? (<><Title>Congratulations, you found Tico's Bone!</Title><Paragraph>More Levels coming soon.</Paragraph></>) : (<Title>Tico has to go to the vet for a while :(</Title>)}
            <Paragraph>
            Would you like to play again?
            </Paragraph>
            <Paragraph>
                Final Score: {score}
                <br />
                {playerStatus.playerHealth === 5 ? "Congratulations on a no-damage run!" : ""}
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
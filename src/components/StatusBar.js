import React, { useMemo } from "react";
import styled from "styled-components";

import { usePlayerStatus } from "./App";
import { BaseText } from "../styles/Typography";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
    height: 7vh;
    background-color: #2e4730;
    padding-bottom: 2.5px;
`;

const SectionBar = styled.div`
    background-color: #2e4730;
    display: flex;
    padding: 0 1%;
`;

const Heart = styled.div`
    width: 21px;
    height: 18px;
    background: url(${props => props.empty ? "./media/images/Heart-empty.png" : "./media/images/Heart-fill.png"});
    background-repeat: no-repeat;
`;

export default () => {
    const {playerStatus} = usePlayerStatus();

    const getHeartComponents = useMemo(() => {
        return new Array(5).fill(undefined).map((val, index) => {
            return playerStatus.playerHealth > index ? <Heart key={`Heart_${index}`}/> : <Heart empty key={`Heart_${index}`} />
        })
    }, [playerStatus.playerHealth])

    return (
        <Wrapper>
            <SectionBar key={"Heart-Container"}>
                {getHeartComponents}
            </SectionBar>
            <SectionBar key={"Coins-Container"}>
                <BaseText>Current Coins: {playerStatus.playerCoins}</BaseText>
            </SectionBar>
            <SectionBar key={"Moves-Container"}>
                <BaseText>Current Moves: {playerStatus.playerMoves}</BaseText>
            </SectionBar>
            <SectionBar key={"Level-Container"}>
                <BaseText>Current Level: {playerStatus.currentLevel}</BaseText>
            </SectionBar>


        </Wrapper>
    )
}
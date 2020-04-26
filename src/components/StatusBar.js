import React, { useMemo } from "react";
import styled from "styled-components";

import { usePlayerStatus } from "./App";

const Wrapper = styled.div`
    background-color: black;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SectionBar = styled.div`
    padding: 14px;
    color: white;
    display: flex;
`

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
                <p>Current Coins: </p>
                {playerStatus.playerCoins}
            </SectionBar>
            <SectionBar key={"Moves-Container"}>
                <p>Current Moves: </p>
                {playerStatus.playerMoves}
            </SectionBar>
            <SectionBar key={"Level-Container"}>
                <p>Current Level: </p>
                {playerStatus.currentLevel}
            </SectionBar>


        </Wrapper>
    )
}
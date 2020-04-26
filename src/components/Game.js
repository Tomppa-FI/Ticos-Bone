import React from "react";
import styled from "styled-components";
import Level from "./Level";
import levelData from "../game/levelData.json";

import { usePlayerStatus } from "./App";
import StatusBar from "./StatusBar";
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
`;

export default () => {
    const {playerStatus} = usePlayerStatus();
    const currentLevel = playerStatus.currentLevel;
    const LevelComponent = <Level {...levelData[currentLevel]} />;
    return (
        <Wrapper>
            <StatusBar />
            {LevelComponent}
        </Wrapper>
    )
}
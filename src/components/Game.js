import React from "react";
import styled from "styled-components";
import Level from "./Level";
import levelData from "../game/levelData.json";

import { usePlayerStatus } from "./App";
const Wrapper = styled.div`

`;

export default () => {
    const {playerStatus} = usePlayerStatus();
    const currentLevel = playerStatus.currentLevel;
    const LevelComponent = <Level {...levelData[currentLevel]} />;
    return (
        <Wrapper>
            {LevelComponent}
        </Wrapper>
    )
}
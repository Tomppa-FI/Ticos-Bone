import React, {useEffect} from "react";
import styled from "styled-components";
import Level from "./Level";
import levelData from "../game/levelData.json";

import { usePlayerStatus } from "./App";
import StatusBar from "./StatusBar";
const overworldMusic = new Audio("./media/audio/Overworld.mp3");
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
`;

export default ({setGameState}) => {
    const {playerStatus} = usePlayerStatus();
    const currentLevel = playerStatus.currentLevel;
    const LevelComponent = <Level {...levelData[currentLevel]} />;

    useEffect(() => {
        overworldMusic.loop = true;
        overworldMusic.play();

        return () => {
            overworldMusic.pause()
            overworldMusic.currentTime = 0;
        };
    }, [currentLevel])

    return (
        <Wrapper>
            <StatusBar />
                {levelData[currentLevel] ? LevelComponent : setGameState("GameOver")}
        </Wrapper>
    )
}
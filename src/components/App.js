import React, {useState, useMemo, useContext, useReducer} from "react";
import styled from "styled-components";
import MainMenu from "./MainMenu";
import Game from "./Game";
import GameOver from "./GameOver";


const APP_COMPONENTS = { 
    "MainMenu": MainMenu,
    "Game": Game,
    "GameOver": GameOver,
};

const Wrapper = styled.div`
    background-color: darkgreen;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const initialPlayerStatus = {
    playerHealth: 5,
    playerCoins: 0,
    playerMoves: 0,
    currentLevel: 1,
}

const playerStatusReducer = (state, action) => {
    switch (action.type){
        case "ResetGame": 
            return {
                initialPlayerStatus
            }
        case "IncreaseHealth": 
            return {
                ...state,
                playerHealth: state.playerHealth + action.payload
            }
        case "DecreaseHealth":
            return {
                ...state,
                playerHealth: state.playerHealth - action.payload
            }
        case "IncreaseCoins":
            return {
                ...state,
                playerCoins: state.playerCoins + action.payload
            }
        case "IncreaseMoves":
            return {
                ...state,
                playerMoves: state.playerMoves + 1
            }
        case "IncreaseLevel":
            return {
                ...state,
                currentLevel: state.currentLevel + action.payload
            }
        default:
            throw new Error("Invalid Action.Type");
    }
}

const PlayerStatusContext = React.createContext(null);

export const usePlayerStatus = () => useContext(PlayerStatusContext);

export default () => {
    const [playerStatus, dispatch] = useReducer(playerStatusReducer, initialPlayerStatus);
    const [gameState, setGameState] = useState("MainMenu");
    const GameComponent = useMemo(() => APP_COMPONENTS[gameState], [gameState]);

    return (
        <Wrapper>
            <PlayerStatusContext.Provider value={{playerStatus, dispatch}} >
                {GameComponent ? (
                    <GameComponent setGameState={setGameState}/>
                ) : (
                    `Invalid GameComponent`
                )}
            </PlayerStatusContext.Provider>
        </Wrapper>
    )
}
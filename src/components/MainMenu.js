import React, {useState, useMemo} from "react";
import styled from "styled-components";
import Start from "./Start"
import Info from "./Info"

const Wrapper = styled.div`
    height: 70%;
    width: 70%;
    background-color: black;
    text-align: center;
    color: white;
`;

const MENU_COMPONENTS = { 
    "Start": Start,
    "Info": Info,
};

export default ({setGameState}) => {
    const [menuState, setMenuState] = useState("Start");
    const MenuComponent = useMemo(() => MENU_COMPONENTS[menuState], [menuState]);
    return (
        <Wrapper>
            {MenuComponent ? (
                <MenuComponent setMenuState={setMenuState} setGameState={setGameState} />
            ) : (
                `Invalid MenuComponent`
            )}
        </Wrapper>
    )
}
import React, {useState, useMemo} from "react";
import styled from "styled-components";
import Start from "./Start"
import Info from "./Info"

const Wrapper = styled.div`
  width: 800px;
  height: 400px;
  background-color: #323b33;
  text-align: center;
  border: 3px solid #323b33;
  border-radius: 15px;
  padding: 5px;
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
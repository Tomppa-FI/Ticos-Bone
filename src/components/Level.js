import React from "react";
import styled from "styled-components";

import { usePlayerStatus } from "./App";

const Wrapper = styled.div`

`;

export default ({fixedTiles}) => {
    const {playerStatus, dispatch} = usePlayerStatus();
    return (
        <Wrapper>
        </Wrapper>
    )
}
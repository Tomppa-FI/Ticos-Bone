import React, { useMemo } from "react";
import styled from "styled-components";

import { FixedTile } from "./Tiles";

import { usePlayerStatus } from "./App";

const Wrapper = styled.div`
    margin: 0 auto;
    width: 1200px;
    height: 600px;
    background: url("./media/images/Background-Tile.png");
    position: relative;
`;

export default ({fixedTiles}) => {
    const {playerStatus, dispatch} = usePlayerStatus();

    const fixedComponents = useMemo(() => 
        Object.entries(fixedTiles).map(([tileType, tiles]) => 
            tiles.map(([left, top], index) => (
                <FixedTile
                    key={`${tileType}_${index}`}
                    left={left}
                    top={top}
                    tileType={tileType}
                />
            ))
        ).flat(), [fixedTiles]
    )

    return (
        <Wrapper>
            {fixedComponents}
        </Wrapper>
    )
}
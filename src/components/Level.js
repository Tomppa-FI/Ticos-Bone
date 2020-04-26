import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";

import { FixedTile, EntityTile } from "./Tiles";
import { isNewPositionValid } from "../game/logic/Collision";
import { usePlayerStatus } from "./App";
import { DispatchMap } from "../Constants";

const Wrapper = styled.div`
    margin: 0 auto;
    width: 1200px;
    height: 600px;
    background: url("./media/images/Background-Tile.png");
    position: relative;
`;

const orientationFactorMap = {
    north: [0, -40],
    south: [0, 40],
    east: [40, 0],
    west: [-40, 0]
}

const oppositeOrientationMap = {
    north: "south",
    south: "north",
    east: "west",
    west: "east"
}

const keyMap = {
    w: 'north',
    up: 'north',
    arrowup: 'north',
    s: 'south',
    down: 'south',
    arrowdown: 'south',
    a: 'west',
    left: 'west',
    arrowleft: 'west',
    d: 'east',
    right: 'east',
    arrowright: 'east',
  };


export default ({fixedTiles, dog, monsters}) => {
    const {playerStatus, dispatch} = usePlayerStatus();
    const [monsterObjects, setMonsterObjects] = useState(monsters);
    const [dogObject, setDogObject] = useState(dog);

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

    const monsterComponents = (
        monsterObjects.map(({pos, orientation, walkingState, entityType}, index) => {
            const [left, top] = pos;
            return (
                <EntityTile
                    key={`${entityType}_${index}`}
                    left={left}
                    top={top}
                    orientation={orientation}
                    entityType={entityType}
                    walkingState={walkingState}
                />
            )
        })
    )

    const dogComponent = useMemo(() => (
        <EntityTile
            key={`${dogObject.entityType}`}
            left={dogObject.pos[0]}
            top={dogObject.pos[1]}
            entityType={dogObject.entityType}
            orientation={dogObject.orientation}
            walkingState={dogObject.walkingState}
        />
    ), [dogObject]);

    

    const invalidPositions = useMemo(() => Object.values(fixedTiles).flat(), [fixedTiles])

    const updateGame = () => {
        setMonsterObjects((prevMonsters) => {
            return prevMonsters.map(({orientation, pos, walkingState, entityType}) => {
                const [offsetLeft, offsetTop] = orientationFactorMap[orientation];
                const nextCoordinates = [pos[0] + offsetLeft, pos[1] + offsetTop];
                const isValidPosition = isNewPositionValid(nextCoordinates, invalidPositions);
                const nextOrientation = isValidPosition ? orientation : oppositeOrientationMap[orientation];
                const nextWalkingState = isValidPosition ? walkingState + 2 : 2;
                const nextPos = isValidPosition ? nextCoordinates : [pos[0] - offsetLeft, pos[1] - offsetTop];
                return {
                    orientation: nextOrientation,
                    walkingState: nextWalkingState,
                    pos: nextPos,
                    entityType
                }
            })
        })
    }

    const handleKeyPress = ({key}) => {
        const newOrientation = keyMap[key.toLowerCase()];
        if (!newOrientation) {
            return;
        }
        const {pos, orientation, walkingState} = dogObject;
        const nextWalkingState = newOrientation === orientation ? walkingState + 2 : 2;
        const [offsetLeft, offsetTop] = orientationFactorMap[newOrientation];
        const newPosition = [pos[0] + offsetLeft, pos[1] + offsetTop];

        if (!isNewPositionValid(newPosition, invalidPositions)) {
            return;
        }

        dispatch({
            type: DispatchMap.INCREASE_MOVES
        })

        setDogObject((prevDogObject) => {
            return {
                ...prevDogObject,
                walkingState: nextWalkingState,
                orientation: newOrientation,
                pos: newPosition
            }
        })
    }

    useEffect(() => {
        const interval = setInterval(updateGame, 500);
        return () => clearInterval(interval);
    }, [])

    return (
        <Wrapper tabIndex="1" onKeyPress={handleKeyPress}>
            {fixedComponents}
            {monsterComponents}
            {dogComponent}
        </Wrapper>
    )
}
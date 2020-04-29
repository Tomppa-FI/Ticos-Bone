import React, { useMemo, useState, useEffect} from "react";
import styled from "styled-components";

import { FixedTile, EntityTile, CollectableTile } from "./Tiles";
import { isNewPositionValid, didDogTouchEntity, didDogTouchCollectable, didDogTouchBone } from "../game/logic/Collision";
import { usePlayerStatus } from "./App";
import { DispatchMap } from "../Constants";

const Wrapper = styled.div`
    margin: 0 auto;
    width: 1200px;
    height: 600px;
    background: url("./media/images/Background-Tile.png");
    position: relative;
    &:focus {
        outline: none;
    }
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


export default ({fixedTiles, walkableTiles, dog, monsters, coins, bone}) => {
    const {playerStatus, dispatch} = usePlayerStatus();
    const [monsterObjects, setMonsterObjects] = useState(monsters);
    const [dogObject, setDogObject] = useState(dog);
    const [coinObjects, setCoinObjects] = useState(coins);
    const boneComponent = useMemo(() => (
        <CollectableTile 
            key={"Bone"}
            left={bone[0]}
            top={bone[1]}
            entityType="bone"
        />
    ), [bone])

    const coinComponents = useMemo(() => {
        return Object.values(coinObjects).map((pos, index) => {
            return <CollectableTile
                key={`Coin${index}`}
                left={pos[0]}
                top={pos[1]}
                entityType={"coin"}
            />
        })
    }, [coinObjects])

    const walkableFixedComponents = useMemo(() =>
        Object.entries(walkableTiles).map(([tileType, tiles]) => 
            tiles.map(([left, top], index) => (
                <FixedTile
                    key={`${tileType}_${index}`}
                    left={left}
                    top={top}
                    tileType={tileType}
                />
            ))
        ).flat(), [walkableTiles]
    )

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
        if (didDogTouchEntity(dogObject.pos, monsterObjects.map(({pos}) => pos))) {
            handleDamageDog(1);
        }
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

    const handleDogInteraction = newPosition => {
        
        dispatch({
            type: DispatchMap.INCREASE_MOVES
        })

        if (didDogTouchEntity(newPosition, monsterObjects.map(({pos}) => pos))) {
            handleDamageDog(1);
        }

        if (didDogTouchBone(newPosition, bone)) {
            dispatch({
                type: DispatchMap.INCREASE_LEVEL,
                payload: 1
            })
        }

        if (didDogTouchCollectable(newPosition, coinObjects)) {
            new Audio("./media/audio/Coinpickup.wav").play();
            dispatch({
                type: DispatchMap.INCREASE_COINS,
                payload: 1
            });
            setCoinObjects((prevCoins) => {
                return prevCoins.filter(pos => {
                    return (pos[0] !== newPosition[0] || pos[1] !== newPosition[1]);
                });
            })
        }
    }

    const handleDamageDog = dmgTaken => {
        new Audio("./media/audio/Ticohit.wav").play();
        dispatch({
            type: DispatchMap.DECREASE_HEALTH,
            payload: dmgTaken
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

        handleDogInteraction(newPosition);

        setDogObject((prevDogObject) => {
            return {
                ...prevDogObject,
                walkingState: nextWalkingState,
                orientation: newOrientation,
                pos: newPosition
            }
        })
    };

    useEffect(() => {
        const interval = setInterval(updateGame, 500);
        return () => clearInterval(interval);
    }, [monsterObjects])

    return (
        <Wrapper tabIndex="1" onKeyPress={handleKeyPress}>
            {fixedComponents}
            {monsterComponents}
            {dogComponent}
            {coinComponents}
            {boneComponent}
            {walkableFixedComponents}
        </Wrapper>
    )
}
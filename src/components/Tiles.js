import styled from "styled-components";

const mapTypeToImageUrl = {
    "dog": "./media/images/Dog.png",
    "evilghost": "./media/images/EvilGhost.png",
    "skeleton": "./media/images/Skeleton.png",
    "pumpkinman": "./media/images/PumpkinMan.png",
    "coin": "./media/images/Coin.gif",
    "bone": "./media/images/Bone.png",
    "river-corner-ne": "./media/images/RiverCornerNE.png",
    "river-end-south": "./media/images/RiverEndSouth.png",
    "river-end-west": "./media/images/RiverEndWest.png",
    "river-horizontal": "./media/images/RiverHorizontal.png",
    "river-vertical": "./media/images/RiverVertical.png",
    "rock": "./media/images/Rock.png",
    "tree": "./media/images/Tree.png",
    "grass": "./media/images/Grass.png",
    "bush": "./media/images/Bush.png",
    "pond": "./media/images/Pond.png",
    "bridge-vertical": "./media/images/BridgeVertical.png"
}

const mapOrientationToTopOffset = {
    "north": "-120px",
    "south": "0",
    "east": "-80px",
    "west": "-40px"
}

const mapWalkingAnimationStateToLeftOffset = {
    1: "0",
    2: "-40px",
    3: "-80px"
}

const Tile = styled.div`
    position: absolute;
    height: 40px;
    width: 40px;
    background-repeat: no-repeat;
`;

export const FixedTile = styled(Tile).attrs(({left, top, tileType}) => ({
    style: {
        backgroundImage: `url(${mapTypeToImageUrl[tileType]})`,
        transform: `translate(${left}px, ${top}px)`
    }
}))`
`;


export const EntityTile = styled(Tile).attrs(({left, top, tileType, orientation, walkingState}) => {
    const walkingAnimationState = walkingState % 6 === 0 ? 3 : walkingState % 4 === 0 ? 2 : 1;
    return ({
        style: {
            backgroundImage: `url(${mapTypeToImageUrl[tileType]})`,
            transform: `translate3d(${left}px, ${top}px, 0)`,
            transition: `${tileType === "dog" ? "transform 0.05s linear 0s" : "transform 0.5s linear 0s"}`,
            backgroundPosition: `${mapWalkingAnimationStateToLeftOffset[walkingAnimationState]} ${mapOrientationToTopOffset[orientation]}`
        }
    })
})`
    will-change: transform;
    z-index: 1;
`;

export const CollectableTile = styled(Tile).attrs(({left, top, tileType}) => ({
    style: {
        backgroundImage: `url(${mapTypeToImageUrl[tileType]})`,
        transform: `translate(${left}px, ${top}px)`,
    }
}))`
    background-position: center;
`;
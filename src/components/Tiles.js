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
    background-image: url(${props => mapTypeToImageUrl[props.tileType]});
`;

export const FixedTile = styled(Tile)`
    transform: translate(${props => props.left}px, ${props => props.top}px);    
`;


export const EntityTile = styled(Tile)`
    will-change: transform;
    transform: translate3d(${props => props.left}px, ${props => props.top}px, 0);    
    z-index: 1;
    transition: ${props => props.tileType === "dog" ? "transform 0.05s linear 0s" : "transform 0.5s linear 0s"};
    background-position: ${props => {
        const walkingAnimationState = props.walkingState % 6 === 0 ? 3 : props.walkingState % 4 === 0 ? 2 : 1;
        return `${mapWalkingAnimationStateToLeftOffset[walkingAnimationState]} ${mapOrientationToTopOffset[props.orientation]}`;
    }}
`;

export const CollectableTile = styled(Tile)`
    transform: translate(${props => props.left}px, ${props => props.top}px);
    background-position: center;
`;
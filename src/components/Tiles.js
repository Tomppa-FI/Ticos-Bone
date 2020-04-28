import styled from "styled-components";

const mapFixedTileToOffset = {
    "river-corner-ne": 0,
    "river-end-south": "-40px",
    "river-end-west": "-80px",
    "river-horizontal": "-120px",
    "river-vertical": "-160px",
    "rock": "-200px",
    "tree": "-240px",
    "grass": "-280px",
    "bush": "-320px",
    "pond": "-360px",
    "bridge-vertical": "-400px"
}

const mapTypeToImageUrl = {
    "dog": "./media/images/Dog.png",
    "evilghost": "./media/images/EvilGhost.png",
    "skeleton": "./media/images/Skeleton.png",
    "pumpkinman": "./media/images/PumpkinMan.png",
    "coin": "./media/images/Coin.gif",
    "bone": "./media/images/Bone.png"
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

export const FixedTile = styled(Tile)`
    transform: translate(${props => props.left}px, ${props => props.top}px);    
    background-image: url("./media/images/TileSheet.png");
    background-position: ${props => mapFixedTileToOffset[props.tileType]};
`;

//Transitions will hang w/o hardware acceleration - -webkit-transform: translateZ(0);

export const EntityTile = styled(Tile)`
    transform: translate3d(${props => props.left}px, ${props => props.top}px, 0);    
    background-image: url(${props => mapTypeToImageUrl[props.entityType]});
    z-index: 1;
    transition: ${props => props.entityType === "dog" ? "transform 0.2s linear 0s" : "transform 0.5s linear"};
    background-position: ${props => {
        const walkingAnimationState = props.walkingState % 6 === 0 ? 3 : props.walkingState % 4 === 0 ? 2 : 1;
        return `${mapWalkingAnimationStateToLeftOffset[walkingAnimationState]} ${mapOrientationToTopOffset[props.orientation]}`;
    }}
`;

export const CollectableTile = styled(Tile)`
    transform: translate(${props => props.left}px, ${props => props.top}px);
    background-image: url(${props => mapTypeToImageUrl[props.entityType]});
    background-position: center;
`;
import styled from "styled-components";

const mapFixedTileToOffset = {
    "river-corner-ne": 0,
    "river-end-south": "-40px",
    "river-end-west": "-80px",
    "river-horizontal": "-120px",
    "river-vertical": "-160px",
    "rock": "-200px",
    "tree": "-240px"
}

const Tile = styled.div`
    position: absolute;
    height: 40px;
    width: 40px;
    background-repeat: no-repeat;
`;

export const FixedTile = styled(Tile)`
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    background-image: url("./media/images/TileSheet.png");
    background-position: ${props => mapFixedTileToOffset[props.tileType]};
`;

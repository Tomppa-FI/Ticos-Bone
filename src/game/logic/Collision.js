export const isNewPositionValid = (newPosition, invalidPositions) => {

    if (newPosition[0] < 0 || newPosition[0] > 1160 || newPosition[1] < 0 || newPosition[1] > 560) {
        return false;
    }

    for (let i = 0; i < invalidPositions.length; i++) {
        if (newPosition[0] === invalidPositions[i][0] && newPosition[1] === invalidPositions[i][1]) {
            return false;
        }
    }

    return true;
}

export const didDogTouchEntity = (dogPosition, entityPositions) => {
    return !!entityPositions.find(([left, top]) => left === dogPosition[0] && top === dogPosition[1])
}

export const didDogTouchCollectable = (dogPosition, objectPositions) => {
    return !!objectPositions.find(([left, top]) => left === dogPosition[0] && top === dogPosition[1])
}
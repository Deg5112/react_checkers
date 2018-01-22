export const setCheckerboard = (checkerBoard) => ({
	type: 'checkerBoard',
	value: checkerBoard
});

export const setCheckerSelectedToMoveCoordinate = (coordinate) => ({
	type: 'checkerSelectedToMoveCoordinate',
	value: coordinate
});

export const setPossibleMoveCoordinates = (possibleMoveCoordinates) => ({
	type: 'possibleMoveCoordinates',
	value: possibleMoveCoordinates
});

export const setCheckerRef = (checkerRef) => ({
	type: 'checkerRef',
	value: checkerRef
});

export const removeCheckerRef = (checkerRef) => ({
	type: 'checkerRefRemove',
	value: checkerRef
});

export const setCheckerBoardRef = (checkerBoardRef) => ({
	type: 'checkerBoardRef',
	value: checkerBoardRef
});






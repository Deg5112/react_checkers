export const setCheckerboard = (checkerBoard) => ({
	type: 'checkerBoard',
	value: checkerBoard
});

export const setCheckerSelectedToMove = (checkerSelectedToMove) => ({
	type: 'checkerSelectedToMove',
	value: checkerSelectedToMove
});

export const setCheckerSelectedToMoveCoordinate = (newCoordinate) => ({
	type: 'checkerSelectedToMoveCoordinate',
	value: newCoordinate
});

export const setPossibleMoveCoordinates = (possibleMoveCoordinates) => ({
	type: 'possibleMoveCoordinates',
	value: possibleMoveCoordinates
});

export const setCheckerRef = (checkerRef) => ({
	type: 'checkerRef',
	value: checkerRef
});

export const removeCheckerRef = (key) => ({
	type: 'checkerRef',
	value: key
});

export const setCheckerBoardRef = (checkerBoardRef) => ({
	type: 'checkerBoardRef',
	value: checkerBoardRef
});






export const setCheckerboard = (checkerBoard) => ({
	type: 'checkerBoard',
	value: checkerBoard
});

export const setCheckerSelectedToMove = (checkerSelectedToMove) => ({
	type: 'checkerSelectedToMove',
	value: checkerSelectedToMove
});

export const setInitialCheckersState = (checkers) => ({
	type: 'checkers',
	value: checkers
});

export const setPossibleMoveCoordiantes = (possibleMoveCoordinates) => ({
	type: 'possibleMoveCoordinates',
	value: possibleMoveCoordinates
});



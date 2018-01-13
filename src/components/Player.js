class Player {
	_id = null;
	name = null;
	email = null;
	isTurn = false;
	checkerMap = [];
	
	constructor(id, initialCheckerMap, isTurn = false){
		this._id = id;
		this.checkerMap = initialCheckerMap;
		this.isTurn = isTurn;
		// this.isComputer = false;
	}
	
	updateCheckerMap(oldCoordinate, newCoordinate, jumpedCoordinate = null) {
		this.checkerMap.splice(
			this.getIndexOfCoordinateInCheckerMap(oldCoordinate),
			1,
			newCoordinate
		);
		
		if (jumpedCoordinate) {
		
		}
	}
	
	getIndexOfCoordinateInCheckerMap(coordinate){
		const checkerMap = this.checkerMap;
		const checkerMapLength = checkerMap.length;
		
		for (let x = 0; x<checkerMapLength; x++) {
			if (checkerMap[x] === coordinate) {
				return x;
			}
		}
	}
}

export default Player;

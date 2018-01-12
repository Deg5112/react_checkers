class Player {
	id = null;
	name = null;
	email = null;
	computer = false;
	isTurn = false;
	checkerMap = [];
	
	constructor(id, initialCheckerMap, turn = false){
		this._id = id;
		this.checkerMap = initialCheckerMap;
		this.turn = turn;
	}
	
	getIsTurn() {
		return this.turn;
	}
	
	setIsTurn(bool) {
		this.turn = bool;
		return this;
	}
	
	getIsComputer() {
		return this.computer;
	}
	
	updateCheckerMap(oldCoordinate, newCoordinate) {
		this.checkerMap.splice(
			this.getIndexOfCoordinateInCheckerMap(oldCoordinate),
			1,
			newCoordinate
		);
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

class Player {
	constructor(id, initialCheckerMap, isTurn = false){
		this._id = id;
		this.checkerMap = initialCheckerMap;
		this.kingMap = [];
		this.isTurn = isTurn;
		this.name = null;
		this.email = null;
	}
}

export default Player;

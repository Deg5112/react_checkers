class Player {
	constructor(id, initialCheckerMap, isTurn = false, kingMap = []){
		this._id = id;
		this.checkerMap = initialCheckerMap;
		this.kingMap = kingMap;
		this.isTurn = isTurn;
		this.name = null;
		this.email = null;
	}
}

export default Player;

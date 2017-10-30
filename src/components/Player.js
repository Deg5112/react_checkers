class Player {
	constructor(name, computer = false){
		this.state = {
			_id: null,
			name: name,
			computer: false,
		}
	}
	
	isComputer() {
		return this.computer;
	}
}

export default Player;

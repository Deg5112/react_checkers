class Player {
	constructor(name, computer = false){
		this.state = {
			_id: null,
			name: name,
			email: null,
			computer: false,
		}
	}
	
	isComputer() {
		return this.computer;
	}
}

export default Player;

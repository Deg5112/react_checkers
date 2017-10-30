import React, { Component } from 'react';
import CheckerBoardRow from './CheckerBoardRow';
import Player from './Player.js';

class CheckerBoard extends Component{
	constructor(){
		super();
		let players = [];
		let PlayerOne = new Player('player1');
		let PlayerTwo = new Player('player2');
		
		players.push(PlayerOne, PlayerTwo);
		this.state = {
			checkerBoard: {
				players: players,
				rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
				}
			}
	}
	
	componentWillMount(){
		//look into state management for differnt views/data models
		var checkerBoard = this.state.checkerBoard;
	}

	render() {
		let checkerboardRows = [];
		for (let x = 1; x<9; x++) {
			checkerboardRows.push(<CheckerBoardRow rowIndex={x} key={x}></CheckerBoardRow>)
		}
		
		return (
			<div id="board">
				<div id="board-container">
					{checkerboardRows}
				</div>
			</div>
		);
	}
}

export default CheckerBoard;

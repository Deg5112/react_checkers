import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../testActions';
import CheckerBoardRow from './CheckerBoardRow';
import Player from './Player.js';

class CheckerBoard extends Component{
	constructor(){
		super();
		let players = [(new Player('player1')), (new Player('player2'))];
		this.state = {
			checkerBoard: {
				players: players,
				rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] //make this static?
				}
			}
	}
	
	componentWillMount(){
		
	}
	
	checkPlayerTurn() {
		
	}
	
	didMoveMakeCheckerKing() {
		
	}
	
	moveChecker() {
		
	}
	
	canMoveChecker() {
		
	}
	
	canJumpChecker() {
		
	}
	
	didPlayerWin() {
		
	}
	
	newGame() {
		
	}

	decideTurn() {
		
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

// export default App;
const mapStateToProps = (state) => ({
	checkerBoard: state.checkerBoard
});


const mapDispatchToProps = (dispatch) => {
	console.log('actions', Actions);
	// console.log('bind test', bindActionCreators({Actions}, dispatch));
	return {actions: bindActionCreators({Actions}, dispatch)}
};


export default connect(mapStateToProps, mapDispatchToProps)(CheckerBoard);



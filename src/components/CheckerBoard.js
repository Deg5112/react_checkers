import React, { Component } from 'react';
import CheckerBoardRow from './CheckerBoardRow';
import Player from './Player.js';
import { connect } from 'react-redux';

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
		//look into state management for differnt views/data models
		var checkerBoard = this.state.checkerBoard;
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
		{/*<div id="board">*/}
			{/*<div id="board-container">*/}
				{/*{checkerboardRows}*/}
			{/*</div>*/}
		{/*</div>*/}
		return (
			<input
				value={test}
				ref={node => {input = node;}}
				onChange={() => onFilter(input.value)} />
		);
	}
}

const mapStateToProps = (state) => {
	return {
		filter: state.filter
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFilter: filterText => dispatch(filterTable(filterText))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CheckerBoard);

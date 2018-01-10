import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../testActions';
import CheckerBoardRow from './CheckerBoardRow';

class CheckerBoard extends Component{
	constructor(){
		super();
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
		console.log('board rendered!');
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
	// console.log('bind test', bindActionCreators({Actions}, dispatch));
	return {actions: bindActionCreators(Actions, dispatch)}
};


export default connect(mapStateToProps, mapDispatchToProps)(CheckerBoard);



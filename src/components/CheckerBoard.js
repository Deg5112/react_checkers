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
		this.props.actions.setCheckerBoardRef(this);
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
	
	moveChecker(Player, newCoordinate) {
		Player.checkerMap.splice(
			this.getIndexOfCoordinateInCheckerMap(
				Player,
				this.props.checkerBoard.checkerSelectedToMove.props.coordinate
			),
			1,
			newCoordinate
		);
	}
	
	jumpChecker(Player, coordinate) {
		Player.checkerMap.splice(
				this.getIndexOfCoordinateInCheckerMap(Player, coordinate),
				1,
			);
	}
	
	getIndexOfCoordinateInCheckerMap(Player, coordinate){
		const checkerMap = Player.checkerMap;
		const checkerMapLength = checkerMap.length;
		
		for (let x = 0; x<checkerMapLength; x++) {
			if (checkerMap[x] === coordinate) {
				return x;
			}
		}
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
	return {actions: bindActionCreators(Actions, dispatch)}
};


export default connect(mapStateToProps, mapDispatchToProps)(CheckerBoard);



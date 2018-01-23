import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Checker from './Checker';

class Square extends Component{
	constructor(){
		super();
		this.el = null;
		this.coordinate = null;
	}
	
	componentWillMount() {
	
	}
	
	getSquareClass() {
		let squareClass = null;
		if (this.props.rowIndex % 2 !== 0) {
			squareClass = this.props.squareIndex % 2 !== 0 ? 'black square' : 'red square';
		} else {
			squareClass = this.props.squareIndex % 2 !== 0 ? 'red square' : 'black square';
		}
		
		if (this.props.checkerBoardState.possibleMoveCoordinates.includes(this.coordinate)) {
			squareClass += ' possMove';
		}
		
		return squareClass;
	}
	
	canCheckerMoveToMe() {
		const checkerBoardState = this.props.checkerBoardState;
		const { checkerSelectedToMoveCoordinate } = checkerBoardState;
		const checkerSelectedToMove = checkerBoardState.checkerRefs[checkerSelectedToMoveCoordinate];
		
		if (!checkerBoardState.possibleMoveCoordinates.includes(this.coordinate)) {
			return;
		}
		
		let PlayerIsTurn = null;
		let	PlayerNotIsTurn = null;
		
		if (checkerBoardState.Player1.isTurn === true) {
			PlayerIsTurn = checkerBoardState.Player1;
			PlayerNotIsTurn = checkerBoardState.Player2;
		} else {
			PlayerIsTurn = checkerBoardState.Player2;
			PlayerNotIsTurn = checkerBoardState.Player1;
		}
		
		if (checkerSelectedToMove.props.playerId !== PlayerIsTurn._id) {
			return;
		}
		
		let checkerSelectedCoordinateSplit = checkerSelectedToMove.props.coordinate.split('');
		let oldRowIndex = parseInt(checkerSelectedCoordinateSplit[1], 10);
		let oldColumnLetter = checkerSelectedCoordinateSplit[0];
		
		let newRowCoordinateSplit = this.coordinate.split('');
		let newRowIndex = parseInt(newRowCoordinateSplit[1], 10);
		let newColumnLetter = newRowCoordinateSplit[0];
		
		//can checker move in that direction
		const columnIndexMap = this.props.coordinateMapToColumn.columnIndex;
		const squareIndexLetterMap = this.props.coordinateMapToColumn.squareIndex;
		
		let checkerIsJumping = false;
		let JumpedCheckerRef;
		
		//logic to remove the jumped checker
		const rowDiff = Math.abs(Math.abs(oldRowIndex) - Math.abs(newRowIndex));

		if (rowDiff > 1) {
			//if should jump
			const jumpedRowIndex = (oldRowIndex > newRowIndex) ? oldRowIndex - 1 : oldRowIndex + 1;
			
			const currentColumnIndex = columnIndexMap[oldColumnLetter];
			const newColumnIndex = columnIndexMap[newColumnLetter];
			const columnJumpedLetter = (currentColumnIndex > newColumnIndex) ?
				squareIndexLetterMap[currentColumnIndex - 1] : squareIndexLetterMap[currentColumnIndex + 1];
			
			const jumpedCoordinate = columnJumpedLetter+jumpedRowIndex;
			JumpedCheckerRef = checkerBoardState.checkerRefs[jumpedCoordinate];
		
			if (JumpedCheckerRef.props.playerId === PlayerIsTurn._id) {
					return;
			}
			
			checkerBoardState.checkerBoardRef.jumpChecker(PlayerNotIsTurn, JumpedCheckerRef.props.coordinate, JumpedCheckerRef.isKing);
			delete checkerBoardState.checkerRefs[JumpedCheckerRef.props.coordinate];
			checkerIsJumping = true;
			checkerBoardState[PlayerNotIsTurn._id] = PlayerNotIsTurn;
		}
		
		checkerBoardState.checkerBoardRef.moveChecker(PlayerIsTurn, this.coordinate);
		delete checkerBoardState.checkerRefs[checkerSelectedToMove.props.coordinate];
		//this happens so next time moveChecker runs.. it'll get the latest coordinate but it does not..
		this.props.actions.setCheckerSelectedToMoveCoordinate(this.coordinate);
		
		let justBecameKing = false;
		if (
			(PlayerIsTurn._id === 'Player1' && newRowIndex === 8) ||
			(PlayerIsTurn._id === 'Player2' && newRowIndex === 1)
		) {
			checkerBoardState.checkerBoardRef.makeCheckerKing(PlayerIsTurn, this.coordinate);
			justBecameKing = true;
		}
		
		let turnIsOver = true;
		if (
			checkerIsJumping === true &&
			justBecameKing === false
		) {
			//only set the checker ref on an actual checker click, coordinate updated above
			let updateMoveResults = checkerSelectedToMove.updateMoveCoordinates(this.coordinate, false);
			if (
				updateMoveResults.finalCoordiantes.length > 0 &&
				updateMoveResults.canMakeJumps === true
			) {
				turnIsOver = false;
			}
		}
		
		if (turnIsOver === true) {
			checkerBoardState[PlayerIsTurn._id] = PlayerIsTurn;
			checkerBoardState.Player1.isTurn = !checkerBoardState.Player1.isTurn;
			checkerBoardState.Player2.isTurn = !checkerBoardState.Player2.isTurn;
			
			checkerBoardState.possibleMoveCoordinates = [];
			this.props.actions.setCheckerboard(checkerBoardState);
		}
	}
	
	render() {
		let coordinateMap = this.props.coordinateMapToColumn.squareIndex;
		let squareCoordinate = coordinateMap[this.props.squareIndex]+this.props.rowIndex;
		this.coordinate = squareCoordinate;
		let renderSquare;
		let playerId;
		//check if the current square coordinate exists in the either of the player coordinate check map
		if (this.props.checkerBoardState.Player1.checkerMap.includes(squareCoordinate)) {
			//then we know that player 1 has a checker on this square
			playerId = 'Player1';
		}
		
		if (this.props.checkerBoardState.Player2.checkerMap.includes(squareCoordinate)) {
			playerId = 'Player2';
		}
			
		if (typeof playerId !== 'undefined'){
			renderSquare = (
				<div
					className={this.getSquareClass()}
					key={this.props.squareIndex}
				>
					<Checker
						ref="child-checker"
						playerId={playerId}
						coordinate={squareCoordinate}
					>
					</Checker>
				</div>
			);
		} else {
			renderSquare = (
				<div
					ref = {el => this.el = el}
					className={this.getSquareClass()}
					key={this.props.squareIndex}
					onClick={() => { this.canCheckerMoveToMe() }}
				></div>
			)
		}
		
		return (renderSquare);
	}
}

// export default App;
const mapStateToProps = (state) => ({
	checkerBoardState: state.checkerBoard,
	coordinateMapToColumn: state.coordinateMapToColumn,
	checkerBoardRef: state.checkerBoardRef
});


const mapDispatchToProps = (dispatch) => {
	return {actions: bindActionCreators(Actions, dispatch)}
};


export default connect(mapStateToProps, mapDispatchToProps)(Square);

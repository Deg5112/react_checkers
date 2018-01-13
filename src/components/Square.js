import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../testActions';
import Checker from './Checker';

class Square extends Component{
	el = null;
	coordinate = null;
	
	constructor(){
		super();
	}
	
	componentWillMount() {
		
	}
	
	getSquareClass() {
		let squareClass = null;
		if (!(this.props.rowIndex % 2 === 0)) {
			squareClass = !(this.props.squareIndex % 2 === 0) ? 'black square' : 'red square';
		} else {
			squareClass = !(this.props.squareIndex % 2 === 0) ? 'red square' : 'black square';
		}
		
		return squareClass;
	}
	
	canCheckerMoveToMe() {
		//check if square is black
		if (
			this.getSquareClass() !== 'black square' ||
			this.refs.hasOwnProperty('child-checker')
		) {
			return false;
		}
		
		const checkerBoard = this.props.checkerBoard;
		const { checkerSelectedToMove } = checkerBoard;
		
		if (!checkerBoard.possibleMoveCoordinates.includes(this.coordinate)) {
			return;
		}
		
		let PlayerIsTurn = null;
		let	PlayerNotIsTurn = null;
		
		if (checkerBoard.Player1.isTurn === true) {
			PlayerIsTurn = checkerBoard.Player1;
			PlayerNotIsTurn = checkerBoard.Player2;
		} else {
			PlayerIsTurn = checkerBoard.Player2;
			PlayerNotIsTurn = checkerBoard.Player1;
		}
		
		if (! PlayerIsTurn.checkerMap.includes(checkerBoard.checkerSelectedToMove.props.coordinate)) {
			return;
		}
		
		//does checker belong to player who's turn it is.
		if (checkerSelectedToMove.props.playerId !== PlayerIsTurn._id) {
			return;
		}
		
		let checkerSelectedCoordinateSplit = checkerSelectedToMove.props.coordinate.split('');
		let currentRowIndex = parseInt(checkerSelectedCoordinateSplit[1]);
		let currentColumnLetter = checkerSelectedCoordinateSplit[0];
		
		let newRowCoordinateSplit = this.coordinate.split('');
		let newRowIndex = parseInt(newRowCoordinateSplit[1]);
		let newColumnLetter = newRowCoordinateSplit[0];
		
		if (checkerSelectedToMove.props.playerId === 'Player1') {
			if (
				currentRowIndex > newRowIndex &&
				checkerSelectedToMove.isKing === false
			) {
				return;
			}
		} else {
			if (
				currentRowIndex < newRowIndex &&
				checkerSelectedToMove.isKing === false
			) {
				return;
			}
		}
		
		//can checker move in that direction
		const columnIndexMap = this.props.coordinateMapToColumn.columnIndex;
		const squareIndexLetterMap = this.props.coordinateMapToColumn.squareIndex;
		const rowDiff = Math.abs(Math.abs(currentRowIndex) - Math.abs(newRowIndex));
		
		if (rowDiff > 1) {
			const jumpedRowIndex = (currentRowIndex > newRowIndex) ? currentRowIndex - 1 : currentRowIndex + 1;
			
			const currentColumnIndex = columnIndexMap[currentColumnLetter];
			const newColumnIndex = columnIndexMap[newColumnLetter];
			const columnJumpedLetter = (currentColumnIndex > newColumnIndex) ?
				squareIndexLetterMap[currentColumnIndex - 1] : squareIndexLetterMap[currentColumnIndex + 1];
			
			const jumpedCoordinate = columnJumpedLetter+jumpedRowIndex;
			const JumpedCheckerRef = checkerBoard.checkerRefs[jumpedCoordinate];
		
			if (JumpedCheckerRef.props.playerId === PlayerIsTurn._id) {
					return;
			}
			
			this.props.checkerBoard.checkerBoardRef.jumpChecker(PlayerNotIsTurn, JumpedCheckerRef.props.coordinate);
			checkerBoard[PlayerNotIsTurn._id] = PlayerNotIsTurn;
		}
		
		console.log('checkerboard ref', this.props);
		this.props.checkerBoard.checkerBoardRef.moveChecker(PlayerIsTurn, this.coordinate);
		checkerBoard[PlayerIsTurn._id] = PlayerIsTurn;
		
		this.props.checkerBoard.Player1.isTurn = !this.props.checkerBoard.Player1.isTurn;
		this.props.checkerBoard.Player2.isTurn = !this.props.checkerBoard.Player2.isTurn;
		this.props.actions.setCheckerboard(checkerBoard);
		
		console.log(checkerBoard);
	}
	
	render() {
		let coordinateMap = this.props.coordinateMapToColumn.squareIndex;
		let squareCoordinate = coordinateMap[this.props.squareIndex]+this.props.rowIndex;
		this.coordinate = squareCoordinate;
		let squareClass = this.getSquareClass();
		let renderSquare;
		let playerId;
		//check if the current square coordinate exists in the either of the player coordinate check map
		if (this.props.checkerBoard.Player1.checkerMap.includes(squareCoordinate)) {
			//then we know that player 1 has a checker on this square
			playerId = 'Player1';
		}
		
		if (this.props.checkerBoard.Player2.checkerMap.includes(squareCoordinate)) {
			playerId = 'Player2';
		}
			
		if (typeof playerId !== 'undefined'){
			renderSquare = (
				<div
					className={squareClass}
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
					className={squareClass}
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
	checkerBoard: state.checkerBoard,
	coordinateMapToColumn: state.coordinateMapToColumn,
	checkerSelectedToMove: state.checkerSelectedToMove,
	checkerBoardRef: state.checkerBoardRef
});


const mapDispatchToProps = (dispatch) => {
	return {actions: bindActionCreators(Actions, dispatch)}
};


export default connect(mapStateToProps, mapDispatchToProps)(Square);

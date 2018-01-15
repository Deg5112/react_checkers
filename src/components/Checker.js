import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../testActions';

class Checker extends Component{
	constructor(){
		super();
		this.isKing = false;
	}
	
	componentWillMount() {
		let kingMap = this.props.checkerBoardState[this.props.playerId].kingMap;
		
		if (kingMap.includes(this.props.coordinate)) {
			this.isKing = true;
		}
		this.props.actions.setCheckerRef(this);
	}
	
	updateMoveCoordinates(newCoordinateAfterJump, setCheckerSelected = true) {
		if (setCheckerSelected == true) {
			this.props.actions.setCheckerSelectedToMoveCoordinate(this.props.coordinate);
		}
		
		const checkerBoardState = this.props.checkerBoardState;
		const columnIndexMap = this.props.coordinateMapToColumn.columnIndex;
		const squareIndexLetterMap = this.props.coordinateMapToColumn.squareIndex;
		let coordinate = newCoordinateAfterJump ? newCoordinateAfterJump : this.props.coordinate;
		let coordinateSplit;
		
		coordinateSplit = coordinate.split('');
		
		let columnLetter = coordinateSplit[0];
		let rowIndex = parseInt(coordinateSplit[1], 10);
		let columnIndex = this.props.coordinateMapToColumn.columnIndex[columnLetter];
		
		let possibleColumnMoveRight;
		if (columnIndex < 8) {
			possibleColumnMoveRight = this.props.coordinateMapToColumn.squareIndex[columnIndex + 1];
		}
		
		let possibleColumnMoveRightTwo;
		if (columnIndex < 8) {
			possibleColumnMoveRightTwo = this.props.coordinateMapToColumn.squareIndex[columnIndex + 2];
		}
		
		let possibleColumnMoveleft;
		if (columnIndex > 1) {
			possibleColumnMoveleft = this.props.coordinateMapToColumn.squareIndex[columnIndex - 1];
		}
		
		let possibleColumnMoveleftTwo;
		if (columnIndex > 2) {
			possibleColumnMoveleftTwo = this.props.coordinateMapToColumn.squareIndex[columnIndex - 2];
		}
		
		let possibleRowMoveDown;
		if (rowIndex < 8) {
			possibleRowMoveDown =  parseInt(rowIndex, 10) + 1;
		}
		
		let possibleRowMoveDownTwo;
		if (rowIndex < 7) {
			possibleRowMoveDownTwo =  parseInt(rowIndex, 10) + 2;
		}
		
		let possibleRowMoveUp;
		if (rowIndex > 1) {
			possibleRowMoveUp =  parseInt(rowIndex, 10) - 1;
		}
		
		let possibleRowMoveUpTwo;
		if (rowIndex > 2) {
			possibleRowMoveUpTwo =  parseInt(rowIndex, 10) - 2;
		}
		
		let finalCoordiantes = [];
		let possibleMovesCoordinates = [];
		
		let coordinateMoveUpRight;
		if (possibleRowMoveUp && possibleColumnMoveRight) {
			coordinateMoveUpRight = possibleColumnMoveRight + possibleRowMoveUp;
			possibleMovesCoordinates.push(coordinateMoveUpRight);
		}
		
		let coordinateMoveUpRightTwo;
		if (possibleRowMoveUpTwo && possibleColumnMoveRightTwo) {
			coordinateMoveUpRightTwo = possibleColumnMoveRightTwo + possibleRowMoveUpTwo;
			possibleMovesCoordinates.push(coordinateMoveUpRightTwo);
		}
		
		let coordinateMoveUpLeft;
		if (possibleRowMoveUp && possibleColumnMoveleft) {
			coordinateMoveUpLeft = possibleColumnMoveleft + possibleRowMoveUp;
			possibleMovesCoordinates.push(coordinateMoveUpLeft);
		}
		
		let coordinateMoveUpLeftTwo;
		if (possibleRowMoveUpTwo && possibleColumnMoveleftTwo) {
			coordinateMoveUpLeftTwo = possibleColumnMoveleftTwo + possibleRowMoveUpTwo;
			possibleMovesCoordinates.push(coordinateMoveUpLeftTwo);
		}
		
		let coordinateMoveDownRight;
		if (possibleRowMoveDown && possibleColumnMoveRight) {
			coordinateMoveDownRight = possibleColumnMoveRight + possibleRowMoveDown;
			possibleMovesCoordinates.push(coordinateMoveDownRight);
		}
		
		let coordinateMoveDownRightTwo;
		if (possibleRowMoveDownTwo && possibleColumnMoveRightTwo) {
			coordinateMoveDownRightTwo = possibleColumnMoveRightTwo + possibleRowMoveDownTwo;
			possibleMovesCoordinates.push(coordinateMoveDownRightTwo);
		}
		
		let coordinateMoveDownLeft;
		if (possibleRowMoveDown && possibleColumnMoveleft) {
			coordinateMoveDownLeft = possibleColumnMoveleft + possibleRowMoveDown;
			possibleMovesCoordinates.push(coordinateMoveDownLeft);
		}
		
		let coordinateMoveDownLeftTwo;
		if (possibleRowMoveDownTwo && possibleColumnMoveleftTwo) {
			coordinateMoveDownLeftTwo = possibleColumnMoveleftTwo + possibleRowMoveDownTwo;
			possibleMovesCoordinates.push(coordinateMoveDownLeftTwo);
		}
		
		//At this point we have all the possible coordinate.
		//loop through each coordiante.. and check if each coordiante is valid
		//get player turn.. turn this into method
		let PlayerIsTurn = null;
		let	PlayerNotIsTurn = null;
		
		if (checkerBoardState.Player1.isTurn === true) {
			PlayerIsTurn = checkerBoardState.Player1;
			PlayerNotIsTurn = checkerBoardState.Player2;
		} else {
			PlayerIsTurn = checkerBoardState.Player2;
			PlayerNotIsTurn = checkerBoardState.Player1;
		}
		
		const possibleMoveCoordiantesLength = possibleMovesCoordinates.length;
		let canMakeJumps = false;
		for (let i = 0; i<possibleMoveCoordiantesLength; i++) {
			let possMoveCoordinate = possibleMovesCoordinates[i];
			let possMoveCoordinateSplit = possMoveCoordinate.split('');
			let possMoveCoordianteRowIndex = parseInt(possMoveCoordinateSplit[1], 10);
			let possMoveCoordianteColumnLetter = possMoveCoordinateSplit[0];
			
			if (this.props.coordinate === possMoveCoordinate) {
				continue;
			}
			
			//if space isn't empty.. can't move there
			if (this.props.checkerBoardState.checkerRefs[possMoveCoordinate]) {
				continue;
			}
			
			//can move in that direction
			if (this.props.playerId === 'Player1') {
				if (
					rowIndex > possMoveCoordianteRowIndex &&
					this.isKing === false
				) {
					continue;
				}
			} else {
				if (
					rowIndex < possMoveCoordianteRowIndex &&
					this.isKing === false
				) {
					continue;
				}
			}
			
			let JumpedCheckerRef;
			//logic to remove the jumped checker. // caculates the ref of what checker is jumped.. checks who it belongs to
			const rowDiff = Math.abs(Math.abs(rowIndex) - Math.abs(possMoveCoordianteRowIndex));
			if (rowDiff > 1) {
				//if should jump
				const jumpedRowIndex = (rowIndex > possMoveCoordianteRowIndex) ? rowIndex - 1 : rowIndex + 1;
				const newColumnIndex = columnIndexMap[possMoveCoordianteColumnLetter];
				const columnJumpedLetter = (columnIndex > newColumnIndex) ?
					squareIndexLetterMap[columnIndex - 1] : squareIndexLetterMap[columnIndex + 1];
				
				const jumpedCoordinate = columnJumpedLetter + jumpedRowIndex;
				JumpedCheckerRef = checkerBoardState.checkerRefs[jumpedCoordinate];
				
				if (
					! JumpedCheckerRef ||
					JumpedCheckerRef.props.playerId === PlayerIsTurn._id
				) {
					continue;
				}
				
				canMakeJumps = true;
			}
			
			finalCoordiantes.push(possMoveCoordinate);
		}
		
		this.props.actions.setPossibleMoveCoordinates(finalCoordiantes);
		console.log(finalCoordiantes);
		
		return {
			finalCoordiantes: finalCoordiantes,
			canMakeJumps: canMakeJumps
		};
	}
	
	render() {
		let checkerColor = (this.props.playerId === 'Player1') ? 'red' : 'black';
		let kingClass = (this.isKing === true) ? ' king' : '';
		return (
			<div
				onClick={() => {this.updateMoveCoordinates()}}
				className={'checker ' + checkerColor + ' ' + kingClass}
				key={this.props.rowIndex}
			>
				{this.isKing === true ?
				<img
					className="king"
					src='images/king.png'
					alt="king"
				/> : null
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	coordinateMapToColumn: state.coordinateMapToColumn,
	checkerBoardState: state.checkerBoard,
	playerTurn: state.playerTurn,
});

const mapDispatchToProps = (dispatch) => {
	return {actions: bindActionCreators(Actions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(Checker);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

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

    canMove() {
			const checkerBoardState = this.props.checkerBoardState;
			let PlayerIsTurn = null;
			let	PlayerNotIsTurn = null;

			if (checkerBoardState.Player1.isTurn === true) {
					PlayerIsTurn = checkerBoardState.Player1;
					PlayerNotIsTurn = checkerBoardState.Player2;
			} else {
					PlayerIsTurn = checkerBoardState.Player2;
					PlayerNotIsTurn = checkerBoardState.Player1;
			}

			if (
					this.hasMoves() === true &&
					PlayerIsTurn._id === this.props.playerId
			) {
					return true;
			}

			return false;
    }

    hasMoves() {
			return this.updateMoveCoordinates(false, false, true);
    }

    getInitialPossibleColumnsRows(columnIndex, rowIndex) {
			let possibleColumnMoves = {};
			let possibleRowMoves = {};

			for (let x = 1; x <= 7; x++) {
					//get all moves right
					if (columnIndex + x <= 8) {
						let possibleColumnMoveRight = this.props.coordinateMapToColumn.squareIndex[columnIndex + x];
						possibleColumnMoves['right'+x] = possibleColumnMoveRight;
					}

					//poss move down
					if (rowIndex + x <= 8) {
						let possibleRowMoveDown = parseInt(rowIndex, 10) + x;
						possibleRowMoves['down'+x] = possibleRowMoveDown;
					}
			}

			for (let i = 7; i >= 1; i--) {
					//get all moves left
					if (columnIndex - i >= 1) {
						let possibleColumnMoveleft = this.props.coordinateMapToColumn.squareIndex[columnIndex - i];
						possibleColumnMoves['left'+i] = possibleColumnMoveleft;
					}

					//move up
					if (rowIndex - i >= 1) {
						let possibleRowMoveUp = parseInt(rowIndex, 10) - i;
						possibleRowMoves['up'+i] = possibleRowMoveUp;
					}
			}


			return {
					possibleRowMoves: possibleRowMoves,
					possibleColumnMoves: possibleColumnMoves
			};
    }

    getPossibleMovesCoordinates(possibleColumnMoves, possibleRowMoves) {
		let possibleMovesCoordinates = [];
		for (let x = 1; x<=8; x++) {
			//upX + rightX
			if (
				possibleRowMoves.hasOwnProperty('up'+x) &&
				possibleColumnMoves.hasOwnProperty('right'+x)
			) {
				possibleMovesCoordinates.push(possibleColumnMoves['right'+x]+possibleRowMoves['up'+x]);
			}
			//upx + leftx
			if (
				possibleRowMoves.hasOwnProperty('up'+x) &&
				possibleColumnMoves.hasOwnProperty('left'+x)
			) {
				possibleMovesCoordinates.push(possibleColumnMoves['left'+x]+possibleRowMoves['up'+x]);
			}

			//downx + rightx
			if (
				possibleRowMoves.hasOwnProperty('down'+x) &&
				possibleColumnMoves.hasOwnProperty('right'+x)
			) {
				possibleMovesCoordinates.push(possibleColumnMoves['right'+x]+possibleRowMoves['down'+x]);
			}

			//downx + leftx
			if (
				possibleRowMoves.hasOwnProperty('down'+x) &&
				possibleColumnMoves.hasOwnProperty('left'+x)
			) {
				possibleMovesCoordinates.push(possibleColumnMoves['left'+x]+possibleRowMoves['down'+x]);
			}
		}

		return possibleMovesCoordinates;
	}
	
	updateMoveCoordinates(newCoordinateAfterJump = false, setCheckerSelected = true, getCanMoveBool = false) {
		if (setCheckerSelected == true) {
			this.props.actions.setCheckerSelectedToMoveCoordinate(this.props.coordinate);
		}
		
		const checkerBoardState = this.props.checkerBoardState;
		const columnIndexMap = this.props.coordinateMapToColumn.columnIndex;
		const squareIndexLetterMap = this.props.coordinateMapToColumn.squareIndex;
		let coordinate = newCoordinateAfterJump ? newCoordinateAfterJump : this.props.coordinate;
		let coordinateSplit;
		
		let PlayerIsTurn = null;
		let	PlayerNotIsTurn = null;
		
		if (checkerBoardState.Player1.isTurn === true) {
			PlayerIsTurn = checkerBoardState.Player1;
			PlayerNotIsTurn = checkerBoardState.Player2;
		} else {
			PlayerIsTurn = checkerBoardState.Player2;
			PlayerNotIsTurn = checkerBoardState.Player1;
		}
		
		if (this.props.playerId !== PlayerIsTurn._id) {
			return;
		}
		
		coordinateSplit = coordinate.split('');
		
		let columnLetter = coordinateSplit[0];
		let rowIndex = parseInt(coordinateSplit[1], 10);
		let columnIndex = this.props.coordinateMapToColumn.columnIndex[columnLetter];

		let { possibleColumnMoves, possibleRowMoves } = this.getInitialPossibleColumnsRows(columnIndex, rowIndex);
		let possibleMovesCoordinates = this.getPossibleMovesCoordinates(possibleColumnMoves, possibleRowMoves);

		//check if coordinate is valid
		let canMakeJumps = false;
		let finalCoordiantes = [];
		const possibleMoveCoordiantesLength = possibleMovesCoordinates.length;

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
			if (rowDiff > 2) {
				continue;
			}

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
			} else {
				//ambiguous, means checker is jumping or we just need bool
				if (setCheckerSelected === false && getCanMoveBool === false) { //means checker is jumping
						continue;
				}
			}
			
			finalCoordiantes.push(possMoveCoordinate);
		}

		if (getCanMoveBool === true) {
			if (finalCoordiantes.length > 0) {
                return true;
			} else {
				return false;
			}
		}
		
		this.props.actions.setPossibleMoveCoordinates(finalCoordiantes);
		return {
			finalCoordiantes: finalCoordiantes,
			canMakeJumps: canMakeJumps
		};
	}
	
	render() {
		let checkerColor = (this.props.playerId === 'Player1') ? 'red' : 'black';
		let kingClass = (this.isKing === true) ? ' king' : '';
		let canMoveClass = (this.canMove() === true) ? ' canMove' : '';
		return (
			<div
				onClick={() => {this.updateMoveCoordinates()}}
				className={'checker ' + checkerColor + ' ' + kingClass + canMoveClass}
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

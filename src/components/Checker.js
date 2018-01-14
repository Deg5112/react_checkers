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
	
	checkerMove() {
		//put checker currently being moved in store
		this.props.actions.setCheckerSelectedToMove(this);
		
		let coordinateSplit = this.props.coordinate.split('');
		let column = coordinateSplit[0];
		let rowIndex = coordinateSplit[1];
		let columnIndex = this.props.coordinateMapToColumn.columnIndex[column];
		
		let possibleColumnMoveRight;
		if (columnIndex < Object.keys(this.props.coordinateMapToColumn.columnIndex).length) {
			possibleColumnMoveRight = this.props.coordinateMapToColumn.squareIndex[columnIndex + 1];
		}
		
		let possibleColumnMoveRightTwo;
		if (columnIndex < Object.keys(this.props.coordinateMapToColumn.columnIndex).length) {
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
		
		let possibleMovesCoordinate = [];
		
		let coordinateMoveUpRight;
		if (possibleRowMoveUp && possibleColumnMoveRight) {
			coordinateMoveUpRight = possibleColumnMoveRight + possibleRowMoveUp;
			possibleMovesCoordinate.push(coordinateMoveUpRight);
		}
		
		let coordinateMoveUpRightTwo;
		if (possibleRowMoveUpTwo && possibleColumnMoveRightTwo) {
			coordinateMoveUpRightTwo = possibleColumnMoveRightTwo + possibleRowMoveUpTwo;
			possibleMovesCoordinate.push(coordinateMoveUpRightTwo);
		}
		
		let coordinateMoveUpLeft;
		if (possibleRowMoveUp && possibleColumnMoveleft) {
			coordinateMoveUpLeft = possibleColumnMoveleft + possibleRowMoveUp;
			possibleMovesCoordinate.push(coordinateMoveUpLeft);
		}
		
		let coordinateMoveUpLeftTwo;
		if (possibleRowMoveUpTwo && possibleColumnMoveleftTwo) {
			coordinateMoveUpLeftTwo = possibleColumnMoveleftTwo + possibleRowMoveUpTwo;
			possibleMovesCoordinate.push(coordinateMoveUpLeftTwo);
		}
		
		let coordinateMoveDownRight;
		if (possibleRowMoveDown && possibleColumnMoveRight) {
			coordinateMoveDownRight = possibleColumnMoveRight + possibleRowMoveDown;
			possibleMovesCoordinate.push(coordinateMoveDownRight);
		}
		
		let coordinateMoveDownRightTwo;
		if (possibleRowMoveDownTwo && possibleColumnMoveRightTwo) {
			coordinateMoveDownRightTwo = possibleColumnMoveRightTwo + possibleRowMoveDownTwo;
			possibleMovesCoordinate.push(coordinateMoveDownRightTwo);
		}
		
		let coordinateMoveDownLeft;
		if (possibleRowMoveDown && possibleColumnMoveleft) {
			coordinateMoveDownLeft = possibleColumnMoveleft + possibleRowMoveDown;
			possibleMovesCoordinate.push(coordinateMoveDownLeft);
		}
		
		let coordinateMoveDownLeftTwo;
		if (possibleRowMoveDownTwo && possibleColumnMoveleftTwo) {
			coordinateMoveDownLeftTwo = possibleColumnMoveleftTwo + possibleRowMoveDownTwo;
			possibleMovesCoordinate.push(coordinateMoveDownLeftTwo);
		}
		
		console.log('poss moves', possibleMovesCoordinate);
		this.props.actions.setPossibleMoveCoordinates(possibleMovesCoordinate);
	}
	
	render() {
		let checkerColor = (this.props.playerId === 'Player1') ? 'red' : 'black';
		let kingClass = (this.isKing === true) ? ' king' : '';
		return (
			<div
				onMouseDown={this.checkerMove.bind(this)}
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
	checkerBoardState: state.checkerBoard,
	playerTurn: state.playerTurn,
	coordinateMapToColumn: state.coordinateMapToColumn
});

const mapDispatchToProps = (dispatch) => {
	return {actions: bindActionCreators(Actions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(Checker);

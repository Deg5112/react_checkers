import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../testActions';

class Checker extends Component{
	playerId = null;
	coordinate = null;
	isking = null;
	
	constructor(playerId, coordinate, isKing = false){
		super();
		this.playerId = playerId,
		this.coordinate = coordinate,
		this.isking = isKing
	}
	
	componentWillMount() {
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
			possibleRowMoveDown =  parseInt(rowIndex) + 1;
		}
		
		let possibleRowMoveDownTwo;
		if (rowIndex < 7) {
			possibleRowMoveDownTwo =  parseInt(rowIndex) + 2;
		}
		
		let possibleRowMoveUp;
		if (rowIndex > 1) {
			possibleRowMoveUp =  parseInt(rowIndex) - 1;
		}
		
		let possibleRowMoveUpTwo;
		if (rowIndex > 2) {
			possibleRowMoveUpTwo =  parseInt(rowIndex) - 2;
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
		let checkerColor = this.props.playerId === 'Player1' ? 'red' : 'black';
		return (
			<div
				onMouseDown={this.checkerMove.bind(this)}
				className={'checker ' + checkerColor}
				key={this.props.rowIndex}
			></div>
		);
	}
}

const mapStateToProps = (state) => ({
	playerTurn: state.playerTurn,
	coordinateMapToColumn: state.coordinateMapToColumn
});

const mapDispatchToProps = (dispatch) => {
	return {actions: bindActionCreators(Actions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(Checker);

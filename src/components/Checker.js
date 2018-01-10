import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../testActions';

class Checker extends Component{
	constructor(playerId, coordinate, isKing = false){
		super();
		this.state = {
			playerId: playerId,
			coordinate: coordinate,
			isking: isKing
		}
	}
	
	componentWillMount() {
		// state.playerId = this.props.playerId;
		// state.coordinate = this.props.coordinate;
		// state.isKing = this.props.isKing;
	}
	
	getIsKing() {
		return this.isKing;
	}
	
	setIsKing(isKingBool) {
		this.isKing = isKingBool;
		return this;
	}
	
	getPlayerId() {
		return this.playerId();
	}
	
	setPlayerId(id) {
		this.playerId = id;
		return this;
	}
	
	setCoordinate(coordinate) {
		this.coordinate = coordinate;
		return this;
	}
	
	checkerMove() {
		console.log('checker move', this.props);
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
		
		let possibleColumnMoveleft;
		if (columnIndex > 1) {
			possibleColumnMoveleft = this.props.coordinateMapToColumn.squareIndex[columnIndex - 1];
		}
		
		let possibleRowMoveDown;
		if (rowIndex < 8) {
			possibleRowMoveDown =  parseInt(rowIndex) + 1;
		}
		
		let possibleRowMoveUp;
		if (rowIndex > 1) {
			possibleRowMoveUp =  parseInt(rowIndex) - 1;
		}
		
		let possibleCoordinateMoves = [];
		
		let coordinateMoveUpRight;
		if (possibleRowMoveUp && possibleColumnMoveRight) {
			coordinateMoveUpRight = possibleColumnMoveRight + possibleRowMoveUp;
			possibleCoordinateMoves.push(coordinateMoveUpRight);
		}
		
		let coordinateMoveUpLeft;
		if (possibleRowMoveUp && possibleColumnMoveleft) {
			coordinateMoveUpLeft = possibleColumnMoveleft + possibleRowMoveUp;
			possibleCoordinateMoves.push(coordinateMoveUpLeft);
		}
		
		let coordinateMoveDownRight;
		if (possibleRowMoveDown && possibleColumnMoveleft) {
			coordinateMoveDownRight = possibleColumnMoveRight + possibleRowMoveDown;
			possibleCoordinateMoves.push(coordinateMoveDownRight);
		}
		
		let coordinateMoveDownLeft;
		if (possibleRowMoveDown && possibleColumnMoveleft) {
			coordinateMoveDownLeft = possibleColumnMoveleft + possibleRowMoveDown;
			possibleCoordinateMoves.push(coordinateMoveDownLeft);
		}
		
		this.props.actions.setPossibleMoveCoordiantes(possibleCoordinateMoves);
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

// export default App;
const mapStateToProps = (state) => ({
	playerTurn: state.playerTurn,
	coordinateMapToColumn: state.coordinateMapToColumn
});


const mapDispatchToProps = (dispatch) => {
	return {actions: bindActionCreators(Actions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(Checker);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../testActions';
import Checker from './Checker';

class Square extends Component{
	el = null;
	coordinate = null;
	blackSquare = false;
	redSquare = false;
	
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
		
		//if it gets this far then the only thing not preventing a move is if the square coordinate is not in
		//array of possible coordinate
		const checkerBoard = this.props.checkerBoard;
		const { checkerSelectedToMove } = checkerBoard;
		
		let playerDidMove = false;
		if (checkerBoard.possibleMoveCoordinates.includes(this.coordinate)) {
			let Player = checkerBoard.Player1.isTurn === true ?
				checkerBoard.Player1 :
				checkerBoard.Player2;
			
			//does checker belong to player who's turn it is.
			if (checkerSelectedToMove.props.playerId !== Player._id) {
				return;
			}
			
			if (checkerSelectedToMove.playerId)
			
			// checkerBoard.checkerSelectedToMove.props.coordinate
			
			//can checker move in that direction
			
			
			// is king?
			
			// if ()
			
			//if soo.. remove selected checker coordinate from player checkerMap, add
			//the selected square coordinate
			console.log('Player CheckMap',Player.checkerMap);
			console.log('Checker Selected Coordinate',checkerBoard.checkerSelectedToMove.props.coordinate);
			
			if (Player.checkerMap.includes(checkerBoard.checkerSelectedToMove.props.coordinate)) {
				Player.updateCheckerMap(
					checkerBoard.checkerSelectedToMove.props.coordinate,
					this.coordinate
				);
				
				checkerBoard[Player._id] = Player;
				playerDidMove = true;
			}
		}
		
		if (playerDidMove === true) {
			this.props.checkerBoard.Player1.isTurn = !this.props.checkerBoard.Player1.isTurn;
			this.props.checkerBoard.Player2.isTurn = !this.props.checkerBoard.Player2.isTurn;
			this.props.actions.setCheckerboard(checkerBoard);
		}
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
						coordinate={squareCoordinate}>
					</Checker>
				</div>
			);
		} else {
			renderSquare = (
				<div
					ref = {el => this.el = el}
					className={squareClass}
					key={this.props.squareIndex}
					onClick={this.canCheckerMoveToMe.bind(this)}
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
	checkerSelectedToMove: state.checkerSelectedToMove
});


const mapDispatchToProps = (dispatch) => {
	return {actions: bindActionCreators(Actions, dispatch)}
};


export default connect(mapStateToProps, mapDispatchToProps)(Square);

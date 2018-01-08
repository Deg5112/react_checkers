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
	playerTurn: state.playerTurn
});


const mapDispatchToProps = (dispatch) => {
	return {actions: bindActionCreators(Actions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(Checker);

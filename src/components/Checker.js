import React, { Component } from 'react';

class Checker extends Component{
	constructor(){
		super();
		this.state = {
			playerId: null,
			coordinate: null,
			isking: false
		}
	}
	
	componentWillMount() {
		//look into state management for differnt views/data models
		let state = this.state;
		state.playerId = this.props.playerId;
		state.coordinate = this.props.coordinate;
		state.isKing = this.props.isKing;
		this.setState(state);
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
	
	render() {
		
		return (
			<div className="checker" key={this.props.rowIndex}></div>
		);
	}
}

export default Checker;

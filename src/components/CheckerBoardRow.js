import React, { Component } from 'react';

class CheckerBoardRow extends Component{
	constructor(){
		super();
		this.state = {
			checkerBoard: {
				players: [],
			}
		}
	}
	
	componentWillMount() {
		//look into state management for differnt views/data models
		var checkerBoard = this.state.checkerBoard;
		var PlayerOne = {}
	}
	
	render() {
		return (
			<div className="row">Row!</div>
		);
	}
}

export default CheckerBoardRow;

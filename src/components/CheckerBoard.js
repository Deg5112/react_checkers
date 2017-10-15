import React, { Component } from 'react';
import CheckerBoardRow from './CheckerBoardRow';

class CheckerBoard extends Component{
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
			<div className="checker-board">
				<CheckerBoardRow />
				<CheckerBoardRow />
				<CheckerBoardRow />
				<CheckerBoardRow />
				<CheckerBoardRow />
			</div>
		);
	}
}

export default CheckerBoard;

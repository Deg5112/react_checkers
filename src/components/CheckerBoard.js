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
			<div id="board">
				<div id="board-container">
					<div className="board-row">
						<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
					</div>
					<div className="board-row">
						<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
					</div>
					<div className="board-row">
						<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
					</div>
					<div className="board-row">
						<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
					</div>
					<div className="board-row">
						<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
					</div>
					<div className="board-row">
						<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
					</div>
					<div className="board-row">
						<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
					</div>
					<div className="board-row">
						<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
					</div>
				</div>
			</div>
		);
	}
}

export default CheckerBoard;

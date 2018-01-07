import React, { Component } from 'react';
import Square from './Square';

class CheckerBoardRow extends Component{
	constructor(){
		super();
		this.state = {
			checkerBoard: {
				players: [],
				playerTurn: null,
			}
		}
	}
	
	componentWillMount() {
	}
	
	render() {
		let squares = [];
		for (var x = 1; x < 9; x++) {
			squares.push(<Square squareIndex={x} rowIndex={this.props.rowIndex} key={x}/>)
		}
		
		return (
			<div className="board-row" key={this.props.rowIndex}>
				{squares}
			</div>
		);
	}
}

export default CheckerBoardRow;

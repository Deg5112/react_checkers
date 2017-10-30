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
	
	getSquareClass() {
		let squareClass = null;
		if (!(this.props.rowIndex % 2 === 0)) {
			squareClass = !(this.props.squareIndex % 2 === 0) ? 'black square' : 'red square';
		} else {
			squareClass = !(this.props.squareIndex % 2 === 0) ? 'red square' : 'black square';
		}
		
		return squareClass;
	}
	
	componentWillMount() {
		//look into state management for differnt views/data models
		var checkerBoard = this.state.checkerBoard;
		var PlayerOne = {}
	}
	
	render() {
		return (<div className={this.getSquareClass()} key={this.props.squareIndex}></div>);
	}
}

export default CheckerBoardRow;

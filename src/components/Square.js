import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../testActions';
import Checker from './Checker';

class Square extends Component{
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
	
	render() {
		const rowIndex = this.props.rowIndex;
		let squareClass = this.getSquareClass();
		let renderSquare;
		if (
			(rowIndex <= 3 || rowIndex >= 6) &&
			this.getSquareClass() === 'black square'
		) {
			let playerId = rowIndex <= 3 ? 'Player1' : 'Player2';
			let coordinateMap = this.props.checkerBoard.coordinateMapToColumn.squareIndex;
			renderSquare = (
				<div className={squareClass} key={this.props.squareIndex}>
					<Checker
						playerId={playerId}
						coordinate={coordinateMap[this.props.squareIndex]+this.props.rowIndex}>
					</Checker>
				</div>
			);
		} else {
			renderSquare = (
				<div className={squareClass} key={this.props.squareIndex}></div>
			)
		}
		
		return (renderSquare);
	}
}

// export default App;
const mapStateToProps = (state) => ({
	checkerBoard: state.checkerBoard
});


const mapDispatchToProps = (dispatch) => {
	return {actions: bindActionCreators({Actions}, dispatch)}
};


export default connect(mapStateToProps, mapDispatchToProps)(Square);

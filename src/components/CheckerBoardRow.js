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
			<div className="row">
				<div className="col-6">
					<div className="row">
						<div className="col-3">
							1
						</div>
						<div className="col-3">
							2
						</div>
						<div className="col-3">
							3
						</div>
						<div className="col-3">
							4
						</div>
					</div>
				</div>
				<div className="col-6">
					<div className="row">
						<div className="col-3">
							5
						</div>
						<div className="col-3">
							6
						</div>
						<div className="col-3">
							7
						</div>
						<div className="col-3">
							8
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CheckerBoardRow;

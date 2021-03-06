import React, { Component } from 'react';
import Square from './Square';

class CheckerBoardRow extends Component{
  render() {
    let squares = [];
    for (let x = 1; x < 9; x++) {
      squares.push(
        <Square
          squareIndex={x}
          rowIndex={this.props.rowIndex}
          key={x}
        />
      )
    }

    return (
      <div className="board-row" key={this.props.rowIndex}>
        {squares}
      </div>
    );
  }
}

export default CheckerBoardRow;
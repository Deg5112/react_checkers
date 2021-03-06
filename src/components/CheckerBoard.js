import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import CheckerBoardRow from './CheckerBoardRow';

class CheckerBoard extends Component{
  componentWillMount(){
    this.props.actions.setCheckerBoardRef(this);
  }

  //TODO finish
  didPlayerWin() {

  }

  newGame() {

  }

  moveChecker(Player, newCoordinate) {
    let checkerBoardState = this.props.checkerBoardState;
    let checkerSelectedToMove = checkerBoardState.checkerRefs[checkerBoardState.checkerSelectedToMoveCoordinate];
    let indexOfOldCoordinate = this.getIndexOfCoordinateInMap(
      Player,
      checkerSelectedToMove.props.coordinate
    );

    Player.checkerMap.splice(
      indexOfOldCoordinate,
      1,
      newCoordinate
    );

    if (checkerSelectedToMove.isKing === true) {
      Player.kingMap.splice(
        this.getIndexOfCoordinateInMap(
          Player,
          checkerSelectedToMove.props.coordinate,
          true
        ),
        1,
        newCoordinate
      );
    }
  }

  jumpChecker(Player, coordinate, jumpedCheckerIsKing) {
    Player.checkerMap.splice(
      this.getIndexOfCoordinateInMap(Player, coordinate),
      1,
    );

    if (jumpedCheckerIsKing === true) {
      Player.kingMap.splice(
        this.getIndexOfCoordinateInMap(
          Player,
          coordinate,
          true
        ),
        1
      );
    }
  }

  getIndexOfCoordinateInMap(Player, coordinate, kingMap = false){
    const map = kingMap === false ? Player.checkerMap : Player.kingMap;
    const mapLength = map.length;

    for (let x = 0; x<mapLength; x++) {
      if (map[x] === coordinate) {
        return x;
      }
    }
  }

  makeCheckerKing(Player, coordinate) {
    Player.kingMap.push(coordinate);
  }

  render() {
    let checkerboardRows = [];
    for (let x = 1; x<9; x++) {
      checkerboardRows.push(<CheckerBoardRow rowIndex={x} key={x}></CheckerBoardRow>)
    }
    return (
      <div id="board">
        <div id="board-container">
          {checkerboardRows}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  checkerBoardState: state.checkerBoard
});

const mapDispatchToProps = (dispatch) => {
  return {actions: bindActionCreators(Actions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckerBoard);



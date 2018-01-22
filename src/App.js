import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions';
import CheckerBoard from './components/CheckerBoard.js';

class App extends Component {
  render() {
    return (
      <div className="App d-flex align-items-center">
	      <CheckerBoard className=""/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
	checkerBoard: state.checkerBoard
});

const mapDispatchToProps = (dispatch) => {
	return {actions: bindActionCreators(Actions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import CheckerBoard from './components/CheckerBoard';

import setCheckerboard from './testActions';
console.log('testAction', setCheckerboard);

class App extends Component {
	constructor(){
		super();
		console.log('constructor this', this);
	}
	
	componentWillMount() {
		//look into state management for differnt views/data models
		// var checkerBoard = this.state.checkerBoard;
		// var PlayerOne = {};
		console.log('Will mount this', this);
	}
	
	
	handleAddProject(project){
		// let projects = this.state.projects;
		// projects.push(project);
		// this.setState({projects: projects});
	}
	
  render() {
    return (
      <div className="App d-flex align-items-center">
	    
      </div>
    );
  }
}

// export default App;
const mapStateToProps = (state) => ({
	checkerBoard: state.checkerBoard
});


const mapDispatchToProps = (dispatch) => {
	console.log('actions', setCheckerboard);
	// console.log('bind test', bindActionCreators({Actions}, dispatch));
	return {actions: bindActionCreators({setCheckerboard}, dispatch)}
};
 

export default connect(mapStateToProps, mapDispatchToProps)(App);
//
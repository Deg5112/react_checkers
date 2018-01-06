import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckerBoard from './components/CheckerBoard';

import * as testActions from './testActions'
console.log(this);

class App extends Component {
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
		var PlayerOne = {};
		console.log(this);
		console.log();
	}
	
	
	handleAddProject(project){
		// let projects = this.state.projects;
		// projects.push(project);
		// this.setState({projects: projects});
	}
	
  render() {
    return (
      <div className="App d-flex align-items-center">
	      <CheckerBoard className=""/>
      {/*<AddProject addProject={this.handleAddProject.bind(this)}/>*/}
      {/*<Projects projects={this.state.projects}/>*/}
      </div>
    );
  }
}

export default App;

const mapStateToProps = (state) => ({
	test: state.test,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ getAPIData }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

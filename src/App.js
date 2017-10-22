import React, { Component } from 'react';
import CheckerBoard from './components/CheckerBoard';

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

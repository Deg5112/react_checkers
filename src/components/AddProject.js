import React, { Component } from 'react';

class AddProject extends Component {
	constructor(){
		super();
		this.state = {
			newProject: {}
		}
	}
	static defaultProps = {
		categories: ['Web Design', 'Web Dev', 'Mobile Dev']
	};
	
	handleSubmit(e){
		e.preventDefault();
		console.log(this.refs.title.value);
		this.setState({newProject: {
			title: this.refs.title.value,
			category: this.refs.category.value
		}}, function(){
			// console.log(this.state);
			this.props.addProject(this.state.newProject);
		})
	}
	
	render() {
		let categoryOptions = this.props.categories.map(category => {
			return <option key={category} value={category}>{category}</option>;
		});
		
		return (
			<div className="add project">
				<h3> Add Project </h3>
				<form onSubmit={this.handleSubmit.bind(this)}>sdf
					<div>
						<label>Title</label> <br />
						<input type="text" ref="title" />
						
						<label>Title</label> <br />
						<select ref="category">
							{categoryOptions}
						</select>
					</div>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default AddProject;

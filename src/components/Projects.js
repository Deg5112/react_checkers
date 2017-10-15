import React, { Component } from 'react';
import ProjectItem from './projectItem';

class projects extends Component {
	render() {
		let projectItems;
		if (this.props.projects) {
			projectItems = this.props.projects.map(project => {
				return (
					<ProjectItem key={project.title} project={project} />
				)
				
			});
		}
		
		return (
			<div className="projects">
				{projectItems}
			</div>
		);
	}
}

export default projects;

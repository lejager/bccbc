import React, { Component } from 'react';

class Admin extends Component {
	render() {
		return(
			<button onClick={this.props.loadItems}>Load Items</button>
		);
	}
}

export default Admin;
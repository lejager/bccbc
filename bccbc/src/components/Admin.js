import React, { Component } from 'react';
import helper from './helper';
import base from './../base';

class Admin extends Component {
	constructor() {
    super();
		this.loadItems = this.loadItems.bind(this);
	}

	loadItems() {
		var oldItems;
		var oldOrders;
		let newItems = require('./items');
		newItems = helper.quantify(newItems);

		base.fetch('items', {
    	context: this
		}).then(items => {
    	oldItems = items;
			base.fetch('orders', {
	    context: this
			}).then(orders => {
	    	oldOrders = orders;
				if (oldItems) {
					const dateObject = new Date()
					const day = dateObject.getDate();
					const month = dateObject.getMonth() + 1;
					const year = dateObject.getFullYear();
					const date = `${year}-${month}-${day}`;
					const archiveData = {
						items : oldItems,
						orders : oldOrders
					};

					// archive the old items and orders
					base.post(`archive-${date}`, {
			    	data: { ...archiveData }
			  	}).then(() => {
						base.post('items', {
				    	data: { ...newItems }
				  	}).then(() => {
							base.remove('orders').then(() => {
    					console.log('items refreshed and orders removed');
  						}).catch(error => {
    					console.error(error);
  						});
				  	}).catch(err => {
				    	console.error(err);
			  		});
					}).catch(err => {
						console.error(err);
					});
				}
	  	}).catch(err => {
				console.error(err);
	  	});
  	}).catch(err => {
			console.error(err);
  	});
	}

	render() {
		return(
			<button onClick={this.loadItems}>Load Items</button>
		);
	}
}

export default Admin;

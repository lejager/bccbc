 import React, { Component } from 'react';

class NewItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

	handleClick(key) {
    this.props.addToItems(key);
 	}

 	render() {
  	let details = this.props.details;
  	let pricePer = +details.PricePer;
  	let price = +details.Price;
    let key = this.props.index;
    return (
      <li key={this.props.i}>
      	<div className="item-info">
          <h3 className="item-name">{details.Description} <span className="item-size">{details.Size} for ${price.toFixed(2)}</span></h3>
    	  </div>
    	  <div className="item-order button--subtle">
    	  	<button onClick={() => this.handleClick(key)}>Add to List</button>
    	  </div>
    	  <div className="item-price">
    	  <span className="item-price-per">${pricePer.toFixed(2)}</span>
    	  </div>
      </li>
    );
  }
}

export default NewItem;

import React, { Component } from 'react';

class Item extends Component {
	constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const updatedOrder = e.target.value;
    this.props.addToOrder(key, updatedOrder);
  }

  render() {
  	let details = this.props.details;
  	let pricePer = +details.PricePer;
  	let price = +details.Price;
    let key = this.props.index;
    return (
      <li key={this.props.i}>
      	<div className="item-info">
          <span className="case-info">Order {isNaN(details.toCompleteCase) ? details.Quantity : details.toCompleteCase} to complete the case</span>
    	  	<h3 className="item-name">{details.Description} <span className="item-size">{details.Size} for ${price.toFixed(2)}</span></h3>
    	  </div>
    	  <div className="item-order">
    	  	<input type="number" step="1" min="0" ref="order" placeholder="0" onChange={(e) => this.handleChange(e, key)} />
    	  </div>
    	  <div className="item-price">
    	  <span className="item-price-per">${pricePer.toFixed(2)}</span>
    	  </div>
      </li>
    );
  }
}

export default Item;
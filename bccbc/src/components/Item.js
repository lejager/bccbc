import React, { Component } from 'react';

class Item extends Component {
	constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(e, key) {
  // 	let details = this.props.details;
  //   let member = this.props.member;
  //   let item = details.Item;

  //   let orderUpdate = {
  //   	item : item,
  //   	quantity : event.target.value,
  //   	price : details.PricePer
  //   }

  //   this.props.addToOrder(member,item,orderUpdate)
  // }

  handleChange(e, key) {
    // const order = this.props.order[key];
    // const updatedOrder = {
    //   ...order,
    //   [key]: e.target.value
    // }
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
    	  	<h3 className="item-name">{details.Description} <span className="item-size">{details.Size} for ${price.toFixed(2)}</span></h3>
    	  </div>
    	  <div className="item-to-complete">
    	 		<span>{details.Quantity - 24}</span>
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
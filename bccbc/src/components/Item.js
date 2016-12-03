import React, { Component } from 'react';

class Item extends Component {
	constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
  	let details = this.props.details;
    let member = this.props.member;
    let item = details.Item;
   //  let price = details.Price;

    let orderUpdate = {
    	item : item,
    	quantity : event.target.value,
    	price : details.Price
    }

    this.props.addToOrder(member,item,orderUpdate)
  }

  render() {
  	let details = this.props.details;
    return (
      <li key={this.props.i}>
    	  <span className="item-name">{details.Description}</span>
    	  <span className="item-size">{details.Size}</span>
    	  <span className="item-price">{details.Price}</span>
    	  <input type="text" ref="order" placeholder="0" onChange={this.handleChange} />
      </li>
    );
  }
}

export default Item;
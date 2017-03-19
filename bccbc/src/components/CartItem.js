import React, { Component } from 'react';

class CartItem extends Component {
	constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  removeFromOrder(e, key) {
    this.props.removeFromOrder(key, 0);
  }

  handleChange(e, key) {
    const updatedOrder = e.target.value;
    this.props.addToOrder(key, updatedOrder);
  }

  render() {
    const {details, index : key} = this.props;
  	const pricePer = +details.PricePer;
  	const price = +details.Price;
    const order = this.props.order[key] || 0;
    const itemTotal = pricePer * order;
    return (
      <li key={this.props.i}>
      	<div className="item-info">
    	  	<h3 className="item-name">{details.Description}</h3>
          <span className="item-size">{details.Size} for ${price.toFixed(2)}</span>
        </div>
				<div className="button--subtle item-order">
					<button onClick={(e) => this.removeFromOrder(e, key)}>Remove</button>
        </div>
    	  <div className="item-order">
    	  	<input type="number" value={order} step="1" min="0" ref="order" placeholder="0" onChange={(e) => this.handleChange(e, key)} />
				</div>
    	  <div className="item-price">
    	  <span className="item-price-per">${pricePer.toFixed(2)}</span>
    	  </div>
      </li>
    );
  }
}

export default CartItem;

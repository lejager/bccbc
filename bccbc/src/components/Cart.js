import React, { Component } from 'react';
import CartItem from './CartItem';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.renderNewItems = this.renderNewItems.bind(this);
  }

  renderNewItems(items, order, key) {
    console.log(items[key]);
    return (
      <CartItem
        details={items[key]}
        order={order[key]}
        key={key}
        index={key}
        // addToItems ={this.addToItems}
      />
    );
  }

  render() {
    const {items, order, cart} = this.props;
    return (
      <div className={"newItemsWrapper " + cart}>
        <div className="newItemsClose">
          <button className="close" onClick={this.closeWindow}>x</button>
        </div>
        <div className="newItems">
          <div className="itemsHeader">
            <h2>Select New Items to Add</h2>
          </div>
          <div className="item-list">
            <ul className="items">
              {Object.keys(order.items).map((key) => this.renderNewItems(items, order, key))}
            </ul>
          </div>
          <div className="total">{order.total}</div>
        </div>
      </div>
    )
  }
}

export default Cart;

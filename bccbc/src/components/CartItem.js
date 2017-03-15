import React, { Component } from 'react';

class CartItem extends Component {
 constructor(props) {
   super(props);
   this.handleClick = this.handleClick.bind(this);
 }

 handleClick(key) {
   this.props.addToItems(key);
 }

 render() {
   const {details, order, index : key} = this.props;
   const pricePer = +details.PricePer;
   const price = +details.Price;
   return (
     <li key={this.props.i}>
       <div className="item-info">
         <h3 className="item-name">{details.Description} <span className="item-size">{details.Size} for ${price.toFixed(2)}</span></h3>
       </div>
       <div className="item-order">
         <button onClick={() => this.handleClick(key)}>Add to List</button>
       </div>
       <div className="item-price">
       <span className="item-price-per">${pricePer.toFixed(2)}</span>
       </div>
     </li>
   );
 }
}

export default CartItem;

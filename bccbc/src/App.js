import React, { Component } from 'react';
import './App.css';
import { browserHistory } from 'react-router';
import Item from './components/Item';
import NewItem from './components/NewItem';
import Cart from './components/Cart';
import base from './base';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid : null,
      member : '',
      items : {},
      orders : {
        total: 0,
        items: {}
      },
      overlay : false,
      shoppingCart: false
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.renderNewItems = this.renderNewItems.bind(this);
    this.addToItems = this.addToItems.bind(this);
    this.addNewItems = this.addNewItems.bind(this);
    this.viewCart = this.viewCart.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    // check if user is logged in
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
        this.orders = base.syncState(`orders/${user.uid}`
          , {
            context: this,
            state: 'orders'
          });
          this.items = base.syncState(`items`
            , {
              context: this,
              state: 'items'
            });
      } else {
        browserHistory.push('/login');
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.items);
    base.removeBinding(this.orders);
  }

  authHandler(err, authData)  {
    if (err) {
      console.error(err);
      return;
    }

    this.setState({
      uid : authData.user.uid,
      member : authData.user.displayName
    })
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  addToItems(item) {
    const items = {...this.state.items}
    items[item].Listed = true;
    this.setState({ items })
  }


  addToOrder(item, updatedOrder) {
    const orders = {...this.state.orders}
    const orderedItems = orders.items || {};
    const items = {...this.state.items}
    let itemQuantity = items[item].Quantity;
    let totalOrdered = items[item].TotalOrdered;
    let total = orders.total || 0;

    // set order
    let prevOrder = orderedItems[item] || 0;
    let orderDiff = updatedOrder - prevOrder;
    let priceDiff = orderDiff * items[item].PricePer;
    orderedItems[item] = +prevOrder + orderDiff;
    items[item].TotalOrdered = totalOrdered + orderDiff;
    items[item].toCompleteCase = itemQuantity - items[item].TotalOrdered; // subtract order from total;
    orders.total = total += +priceDiff;
    orders.items = orderedItems;
    this.setState({ items, orders });
  }

  renderItems(key) {
    const items = this.state.items;
    const orders = this.state.orders.items || {};
    return (
      <Item
        order="1"
        details={items[key]}
        key={key}
        index={key}
        addToOrder={this.addToOrder}
      />
    );
  }

  renderNewItems(key) {
    const items = this.state.items;
    return (
      <NewItem
        details={items[key]}
        key={key}
        index={key}
        addToItems ={this.addToItems}
      />
    );
  }

  addNewItems() {
    const overlay = this.state.overlay ? false : true;
    this.setState({ overlay });
  }

  viewCart() {
    const shoppingCart = this.state.shoppingCart ? false : true;
    this.setState({ shoppingCart });
  }

  closeWindow() {
    this.setState({
      overlay : false,
      shoppingCart : false,
    });
  }

  render() {
    let member = this.state.member;
    const items = this.state.items;
    const orders = this.state.orders;
    const total = orders.total || 0;
    const overlay = this.state.overlay ? 'shown' : 'hidden';
    const shoppingCart = this.state.shoppingCart ? 'shown' : 'hidden';

    return (
      <div className="App Store">
        <div className="App-header">
          <h2>{member ? `Hi ${member}` : 'Hi There'}
            <span className="add-items">
              <a href="#" onClick={this.addNewItems}>Search for More Items</a>
            </span>
            <span className="total">Your Total: ${total.toFixed(2)}</span>
            <span className="view-cart"><a href="#" onClick={this.viewCart}>View Cart</a></span>
          </h2>
          <button onClick={this.logout}>Log Out</button>
        </div>
        <div className="item-list">
          <ul className="items">
            {Object.keys(items).filter((key) => items[key].Listed).map(this.renderItems)}
          </ul>
        </div>
        <button className="addNew" onClick={this.addNewItems}>Search For More Items</button>
        <div className={"newItemsWrapper " + overlay}>
          <div className="newItemsClose">
            <button className="close" onClick={this.closeWindow}>x</button>
          </div>
          <div className="newItems">
            <div className="itemsHeader">
              <h2>Select New Items to Add</h2>
            </div>
            <div className="item-list">
              <ul className="items">
                {Object.keys(items).filter((key) => !items[key].Listed).map(this.renderNewItems)}
              </ul>
            </div>
          </div>
        </div>
        <Cart items={items} order={orders} cart={shoppingCart} />
      </div>
    );
  }
}

export default App;

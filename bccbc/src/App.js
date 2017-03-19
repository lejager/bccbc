import React, { Component } from 'react';
import './App.css';
import { browserHistory } from 'react-router';
import Item from './components/Item';
import NewItem from './components/NewItem';
import Cart from './components/Cart';
import CartItem from './components/CartItem';
import Header from './components/Header';
import ItemList from './components/ItemList';
import NewItemsList from './components/NewItemsList';
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
      moreItems : false,
      shoppingCart: false
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.renderNewItems = this.renderNewItems.bind(this);
    this.renderCartItems = this.renderCartItems.bind(this);
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

  removeFromOrder(item, updatedOrder) {
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
    orderedItems[item] = null;
    orders.items = orderedItems;
    this.setState({ items, orders });
  }

  renderItems(key) {
    const items = this.state.items;
    const orders = this.state.orders.items || {};
    return (
      <Item
        order={orders}
        details={items[key]}
        key={key}
        index={key}
        addToOrder={this.addToOrder}
      />
    );
  }

  renderCartItems(key) {
    const items = this.state.items;
    const orders = this.state.orders.items || {};
    return (
      <CartItem
        order={orders}
        details={items[key]}
        key={key}
        index={key}
        addToOrder={this.addToOrder}
        removeFromOrder={this.removeFromOrder}
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
    const moreItems = this.state.moreItems ? false : true;
    let shoppingCart = this.state.shoppingCart;
    if (moreItems) { shoppingCart = false };
    this.setState({ moreItems , shoppingCart });
  }

  viewCart() {
    const shoppingCart = this.state.shoppingCart ? false : true;
    let moreItems = this.state.moreItems;
    if (shoppingCart) { moreItems = false };
    this.setState({ shoppingCart , moreItems });
  }

  closeWindow() {
    this.setState({
      moreItems : false,
      shoppingCart : false,
    });
  }

  render() {
    const member = this.state.member;
    const items = this.state.items;
    const orders = this.state.orders;
    const total = orders.total || 0;
    const moreItems = this.state.moreItems ? 'shown' : 'hidden';
    const shoppingCart = this.state.shoppingCart ? 'shown' : 'hidden';
    let overlay = 'no-overlay';
    if (this.state.moreItems || this.state.shoppingCart) {
      overlay = 'overlay';
    }

    return (
      <div className={'app ' + overlay}>
        <Header
          member={member}
          total={total}
          addNewItems={this.addNewItems}
          logout={this.logout}
          viewCart={this.viewCart}
        />
        <ItemList items={items} renderItems={this.renderItems} />
        <NewItemsList
          items={items}
          renderNewItems={this.renderNewItems}
          overlay={moreItems}
          closeWindow={this.closeWindow}
        />
        <Cart
          items={items}
          order={orders}
          cart={shoppingCart}
          renderCartItems={this.renderCartItems}
          closeWindow={this.closeWindow}
        />
      </div>
    );
  }
}

export default App;

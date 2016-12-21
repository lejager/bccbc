import React, { Component } from 'react';
import './App.css';
import Member from './components/Member';
import Item from './components/Item';
import helper from './components/helper';
import base from './base';

class App extends Component {
  constructor(props) {
    super(props);
    let items = require('./components/items');
    items = helper.quantify(items);
    this.state = {
      member : '',
      total : 0,
      items : {},
      order : {}
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

  componentWillMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      member: this.props.params.member
    })
    this.items = base.syncState(`items`
      , {
        context: this,
        state: 'items'
      });

    this.orders = base.syncState(`orders/${this.props.params.member}`
      , {
        context: this,
        state: 'order'
      });

    let items = require('./components/items');
    items = helper.quantify(items);
    this.setState({ items });
  }

  componentWillUnmount() {
    base.removeBinding(this.items);
    base.removeBinding(this.orders);
  }

  componentDidMount() {
    
  }

  loadItems() {
    let items = require('./components/items');
    items = helper.quantify(items);
    this.setState({ items });
  }

  addToOrder(item, updatedOrder) {
    const order = {...this.state.order}
    const items = {...this.state.items}
    let total = 0;

    // set order
    order[item] = updatedOrder;

    Object.keys(order).map(function(key) {
      let itemTotal = +items[key].PricePer * order[key];
      items[key].TotalOrdered += +order[key];
      total += itemTotal;
    });
    total = helper.round(total);
    this.setState({ items, order, total });
  }

  renderItems(key) {
    const items = this.state.items;
    return <Item 
      order={this.state.order}
      details={items[key]} 
      key={key} 
      index={key} 
      addToOrder={this.addToOrder} 
    />
  }

  render() {
    let member = this.state.member;
    let total = +this.state.total;
    const items = this.state.items;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Hi {member}<span className="total">Your Total: ${total.toFixed(2)}</span></h2>
        </div>
        <div className="item-list">
          <ul className="items">
            {Object.keys(items).map(this.renderItems)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
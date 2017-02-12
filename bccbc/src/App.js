import React, { Component } from 'react';
import './App.css';
import Member from './components/Member';
import Item from './components/Item';
import NewItem from './components/NewItem';
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
      order : {},
      overlay : false
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.renderItems = this.renderItems.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.renderNewItems = this.renderNewItems.bind(this);
    this.addToItems = this.addToItems.bind(this);
    this.isListed = this.isListed.bind(this);
    this.isNotListed = this.isNotListed.bind(this);
    this.addNewItems = this.addNewItems.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
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

  addToItems(item) {
    const items = {...this.state.items}
    items[item].Listed = true;
    this.setState({ items })
  }


  addToOrder(item, updatedOrder) {
    const order = {...this.state.order}
    const items = {...this.state.items}
    let itemQuantity = items[item].Quantity;
    let totalOrdered = items[item].TotalOrdered;
    let total = this.state.total;

    // set order
    let prevOrder = order[item] || 0;
    let orderDiff = updatedOrder - prevOrder;
    let priceDiff = orderDiff * items[item].PricePer;
    order[item] = +prevOrder + orderDiff;
    items[item].TotalOrdered = totalOrdered + orderDiff;
    items[item].toCompleteCase = itemQuantity - items[item].TotalOrdered; // subtract order from total;
    total = total += +priceDiff;
    this.setState({ items, order, total });
  }

  renderItems(key) {
    const items = this.state.items;
    return (
      <Item 
      order={this.state.order}
      details={items[key]} 
      key={key} 
      index={key} 
      addToOrder={this.addToOrder} />
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

  isListed(key) {
    const items = this.state.items;
    if (items[key].Listed) {
      return true;
    }
  }

  isNotListed(key) {
    const items = this.state.items;
    if(items[key].Listed) {
      return false;
    } else {
      return true;
    }
  }

  addNewItems() {
    let overlay = this.state.overlay ? false : true;
    this.setState({ overlay });
  }

  closeWindow() {
    this.setState({ overlay : false })
  }

  render() {
    let member = this.state.member;
    let total = +this.state.total;
    const items = this.state.items;
    const overlay = this.state.overlay ? 'shown' : 'hidden';

    return (
      <div className="App">
        <div className="App-header">
          <h2>Hi {member}<span className="total">Your Total: ${total.toFixed(2)}</span></h2>
        </div>
        <div className="item-list">
          <ul className="items">
            {Object.keys(items).filter(this.isListed).map(this.renderItems)}
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
                {Object.keys(items).filter(this.isNotListed).map(this.renderNewItems)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
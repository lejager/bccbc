import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import logo from './logo.svg';
import './App.css';
import Member from './components/Member';
import Item from './components/Item';
import helper from './components/helper';

class App extends Component {
  constructor(props) {
    super(props);
    let items = require('./components/items');
    this.state = {
      member : '',
      total : 0,
      items : items,
      order : {}
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      member: this.props.params.member
    })
  }

  addToOrder(member,item,orderUpdate) {
    const order = {...this.state.order}
    order[item] = orderUpdate;
    this.setState({ order });
    let total = 0;
    Object.keys(order).map(function(key) {
      let itemTotal = +order[key].price * +order[key].quantity;
      total += itemTotal;
    });

    total = helper.round(total);
    this.setState({ total })
  }

  renderItems(value, i) {
    return <Item details={value} key={i} member={this.state.member} addToOrder={this.addToOrder} />
  }

  render() {
    let member = this.state.member;
    let total = this.state.total;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Hi {member}<span className="total">Your Total: {total}</span></h2>
        </div>
        <div className="item-list">
          <ul className="items">
            {this.state.items.map(this.renderItems)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
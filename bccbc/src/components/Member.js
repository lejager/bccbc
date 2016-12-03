import React, { Component } from 'react';

class Member extends Component {
  render() {
    return (
      <option value={this.props.value} key={this.props.i}>{this.props.value}</option>
    );
  }
}

export default Member;
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import members from './memberlist';
import Member from './Member';

class Members extends Component {
  renderMembers(value, i) {
    return <Member value={value} key={i} />
  }

  handleChange(e) {
    let member = e.target.value;
    browserHistory.push('/user/' + member);
  }

  render() {
    return (
      <select ref="member" className="choose-member" onChange={this.handleChange}>
        {members.map(this.renderMembers)}
      </select>
    );
  }
}

export default Members;
import React, { Component } from 'react';
import { Selecter } from '../../tomatobean';
import BaseActions, { Notification } from '../../tomatobean/enhance';
// import './style.less';

@BaseActions
@Selecter(['home'])
@Notification
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <div className="home">
        home页面
      </div>
    );
  }
}

module.exports = Home;

import React, { Component } from 'react';
import { Table, Modal, Popconfirm } from 'antd';
// import { observer, removeObserver } from 'notificationcenter';
import { Selecter } from '../../tomatobean';
import BaseActions, { Notification, Tabbar } from '../../tomatobean/enhance';
// import SearchBar from '../../components/searchbar/index';
// import SpecificModal from './createUserModal/index.jsx';
import { del } from '../../models/worker';
import Navbar from '../../components/navbar/navbar';
import './style.less';

@BaseActions
@Selecter(['worker'], { del })
@Notification
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const { observer } = this.props.notification;
    observer('ob', (e) => {
      console.log(e);
    });
  }
  render() {
    return (
      <div className="test page">
        <Navbar />
      </div>
    );
  }
}

module.exports = View;

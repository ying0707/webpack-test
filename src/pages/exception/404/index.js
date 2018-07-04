/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/pages/exception/Eor404.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Monday December 11th 2017 3:09:25 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday December 11th 2017 3:09:25 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import BaseActions from '../../../tomatobean/enhance';

import './style.less';
import cryImg from '../../../../assets/images/error.png';

@BaseActions
class Exception extends Component {
  state = {
    time: 3,
  }
  componentDidMount() {
    let count = 3;
    const timeCount = () => {
      if (count < 0) {
        this.props.baseActions.linkTo('/themis-home');
        return;
      }
      this.setState({
        time: count,
      });
      setTimeout(() => {
        timeCount();
      }, 1000);
      count--;
    };
    timeCount();
  }
  render() {
    return (
      <div className="error-page">
        <div className="error-message">
          <img className="error-image" src={cryImg} alt="cry" />
          <span>哎呀！出错了</span>
        </div>
        <div className="error-operation-message">
          <span>遇到错误<span id="time-count">{this.state.time}</span>秒后自动跳转，立即跳转点击</span>
          <span className="go-home-button" onClick={() => this.props.baseActions.linkTo('/themis-home')}>返回首页</span>
        </div>
      </div>
    );
  }
}

module.exports = Exception;

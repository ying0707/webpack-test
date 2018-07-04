/**
 * File: /Users/fengchengpu/Project/tomatobeen/src/connect/TConnect.js
 * Project: /Users/fengchengpu/Project/tomatobeen
 * Created Date: Monday November 13th 2017 5:39:47 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday November 13th 2017 5:56:03 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDisplayName } from '../util/tools';

/**
 *
 * @param {*目标函数} Target
 * @param {*目标名称} name
 * @param {*表述信息} descriptor
 */
export default function (selects, ao) {
  return (Target) => {
    // console.log(descriptor, Target);
    class WithSubscription extends Component {
      render() {
        const {
          ...props
        } = this.props;
        return (
          <div>
            <div>
              <Target {...props} />
            </div>
          </div>
        );
      }
    }
    WithSubscription.displayName = `TabbarConnect(${getDisplayName(Target)})`;
    function mapState(state) {
      const states = {};
      selects.forEach((stateName) => {
        states[stateName] = state[stateName];
      }, this);
      return { ...states };
    }
    let actions;
    let key;
    for (const k in ao) {
      if (ao.hasOwnProperty(k)) {
        actions = ao[k];
        key = k;
      }
    }
    function mapDispatch(dispatch) {
      const map = {};
      map[key] = bindActionCreators({ ...actions }, dispatch);
      return map;
    }
    return connect(mapState, mapDispatch)(WithSubscription);
  };
}


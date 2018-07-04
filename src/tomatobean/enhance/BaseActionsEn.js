/**
 * File: /Users/fengchengpu/Project/tomatobeen/src/enhance/BaseReduxCompEn.js
 * Project: /Users/fengchengpu/Project/tomatobeen
 * Created Date: Monday November 13th 2017 6:22:08 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday November 13th 2017 6:22:08 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { linkTo, go, goBack, goForward, redirect, rollBack } from '../actions/kitAction';
import { getDisplayName } from '../util/tools';

/**
 *
 * @param {*目标函数} Target
 * @param {*目标名称} name
 * @param {*表述信息} descriptor
 */

export default function BaseActionsEn(Target) {
  // console.log(descriptor, Target);
  function mapState(state) {
    return { tabBarLocations: state.tabBarLocations };
  }
  function mapDispatch(dispatch) {
    return {
      baseActions: bindActionCreators({
        linkTo,
        redirect,
        go,
        goBack,
        goForward,
        rollBack,
      }, dispatch),
    };
  }

  const Comp = connect(mapState, mapDispatch)(Target);
  class WithSubscription extends Component {
    render() {
      const {
        ...props
      } = this.props;

      return (
        <div>
          <Comp {...props} />
        </div>
      );
    }
  }
  WithSubscription.displayName = `BaseActionsEn(${getDisplayName(Comp)})`;

  return WithSubscription;
}

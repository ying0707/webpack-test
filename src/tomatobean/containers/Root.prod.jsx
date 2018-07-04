import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { Route, Router} from 'react-router';
import RouterTree from '../router/routes'

export default class Root extends Component {
  render() {
    const {store, history} = this.props;
    return (
      <Provider store={store}>
        <RouterTree history={history} />
      </Provider>
    );
  }
}

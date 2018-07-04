// modules/NavLink.js
import { Link } from 'react-router';
import React, { Component } from 'react';

class NavLink extends Component {
  render() {
    return <Link {...this.props} activeClassName="active" />;
  }
}

export default NavLink;

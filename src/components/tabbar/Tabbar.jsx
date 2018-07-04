import React, { Component } from 'react';
import { Tabbar } from '../../tomatobean/enhance';
import './tabbar.less';

@Tabbar()
class Tag extends Component {
  constructor(props) {
    super(props);
    this.link = this.link.bind(this);
    this.decrementAndRedirect = this.decrementAndRedirect.bind(this);
  }
  link(e, location, routing) {
    e.stopPropagation();
    if (!routing.locationBeforeTransitions
        || routing.locationBeforeTransitions.pathname !== location.pathname) {
      this.props.tabbarActions.linkTo(location);
    }
  }
  decrementAndRedirect(e, location) {
    e.stopPropagation();
    this.props.tabbarActions.tabBarDecrementAndRedirect(location);
  }
  render() {
    const { tabBarLocations, routing } = this.props;
    const loopTabBars = data => (data.map((location, i) => {
      let active = 'tabbar-normal';
      if (location.state && location.state.mark) {
        if (routing.locationBeforeTransitions
          && routing.locationBeforeTransitions.state
          && routing.locationBeforeTransitions.state.mark
          && (routing.locationBeforeTransitions.state.mark === location.state.mark)) {
          active = 'tabbar-active';
        }
        if (routing.locationBeforeTransitions
          && routing.locationBeforeTransitions.pathname === location.pathname
          && location.state.mark) {
          active = 'tabbar-active';
        }
      }

      if (i === 0) {
        return (
          <span onClick={(e) => { this.link(e, location, routing); }} className={`tabbar-cell ${active}`} key={location.state.mark}>
            <em className="fa fa-file-o" aria-hidden="true" />
            {location.state.mark}
          </span>);
      } else {
        return (
          <span onClick={(e) => { this.link(e, location, routing); }} className={`tabbar-cell ${active}`} key={location.state.mark}>
            <em className="fa fa-file-o" aria-hidden="true" />
            {location.state.mark}
            <i className="fa fa-close" onClick={(e) => { this.decrementAndRedirect(e, location); }} />
          </span>);
      }
    }));

    return (
      <div className="tabBarLocations">
        {loopTabBars(tabBarLocations)}
        <p className="separate-line" />
      </div>
    );
  }
}
module.exports = Tag;

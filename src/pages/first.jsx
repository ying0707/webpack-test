import React, { Component } from 'react';

@BaseActionConnect(['count'], { queryList, del })
class Temp extends Component {
  render() {
    const { count, actions } = this.props;
    const { countIncrease } = actions;
    return (
      <div />
    );
  }
}

module.exports = Temp;

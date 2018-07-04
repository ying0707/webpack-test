import React, { Component } from 'react';
import { Icon } from 'antd';
import './style.less';

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.selected
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      status: nextProps.selected
    })
  }
  
  changeStatus() {
    this.props.callBack(!this.state.status)    
    this.setState({
      status: !this.state.status
    })
  }
  render() {
    return (
      <div className="icheckbox">
        <Icon className={this.state.status ? "icheckbox-active" : "icheckbox-normal"} onClick={()=>this.changeStatus()} type={this.state.status ? "check-square" : "check-square-o"} />
        <label className="icheckbox-label">{this.props.label}</label>
      </div>
    );
  }
}

export default Comp;

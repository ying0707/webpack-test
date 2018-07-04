import React, { Component } from 'react';
import './indexHeader.less';
import NavLink from '../navLink/NavLink';

export default class IndexHeader extends Component {
    toggled = () => {
      if (window.screen.width < 768) {
        $('.navbar-toggle').click();
      }
    }
    render() {
      return (
        <nav className="navbar navbar-inverse navbar-fixed-top themis-header" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#example-navbar-collapse"
              >
                <span className="sr-only">切换导航</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <NavLink className="navbar-brand themis-logo" to={{ pathname: '/themis-home' }} />
            </div>
            <div className="collapse navbar-collapse" id="example-navbar-collapse" onClick={() => this.toggled()}>
              <ul className="nav navbar-nav">
                <li className="" ><NavLink to={{ pathname: '/themis-home' }}>首页</NavLink></li>
                <li className="" ><NavLink to={{ pathname: '/themis-home' }}>购买</NavLink></li>
                <li className="" ><NavLink to={{ pathname: '/themis-home' }}>出售</NavLink></li>
                <li className="" ><NavLink to={{ pathname: '/login' }}>发布广告</NavLink></li>
                <li className="" ><NavLink to={{ pathname: '/themis-home' }}>EXPLORER</NavLink></li>
                <li className="" ><NavLink to={{ pathname: '/themis-home' }}>钱包</NavLink></li>
              </ul>
              <ul className="nav navbar-nav user">
                <li className="" ><NavLink to={{ pathname: '/login' }}>登录</NavLink></li>
                <li className="" ><NavLink to={{ pathname: '/themis-home' }}>注册</NavLink></li>
              </ul>
            </div>
          </div>
        </nav>

      );
    }
}
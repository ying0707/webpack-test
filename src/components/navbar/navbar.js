import React, { Component } from 'react';
import { Selecter } from '../../tomatobean';
import BaseActions from '../../tomatobean/enhance';
import NavLink from '../navLink/NavLink';
// import { toggle } from '../../models/internal';
import { listToTree } from '../../util/tools';
import './navbar.less';

const logoImg = require('../../../assets/images/123.jpg');

const obj = [


  {
    code: '',
    icon: 'icon-home',
    id: 10000,
    name: '消息',
    path: '/worker-manager2',
    pid: '',
    sort: 10000,
    url: '',
  },
  {
    code: '',
    icon: 'icon-home',
    id: 1,
    name: '通讯录',
    path: '/worker-manager2',
    pid: '',
    sort: 1,
    url: '',
  },
  {
    code: '',
    icon: 'icon-home',
    id: 2,
    name: '购买',
    path: '/worker-manager2',
    pid: '',
    sort: 2,
    url: '',
  },
  {
    code: '',
    icon: 'icon-home',
    id: 3,
    name: '出售',
    path: '/worker-manager2',
    pid: '',
    sort: 3,
    url: '',
  },
  {
    code: '',
    icon: 'icon-carrgo',
    id: 4,
    name: '订单',
    path: '/worker-manager2',
    pid: '',
    sort: 4,
    url: '',
  },
];
@BaseActions
@Selecter(['internal'])
export default class Navbar extends Component {
    state = {
      menu: listToTree(obj, { key: 'id', parent: 'pid', children: 'children' }),
    }
    pointerleave=() => {
      $('.submenuDiv').css('display', 'none');
      $('.dropdown-toggle').removeClass('activeA');
    }
    hoverLi =(e, length) => {
      const withs = `${length * 116}px`;
      $('.dropdown-toggle').removeClass('activeA');
      $('.submenuDiv').css('display', 'none');
      let submenuDiv;
      if ($(e.target)[0].className === 'dropdown-toggle') {
        submenuDiv = $(e.target).parent().find('.submenuDiv');
        $('.dropdown-toggle').removeClass('activeA');
        $(e.target).addClass('activeA');
      } else {
        $(e.target).parent().addClass('activeA');
        submenuDiv = $(e.target).parent().parent().find('.submenuDiv');
      }
      submenuDiv.css({ display: 'block', width: withs });
    };
    clickHref =() => {
      $('.submenuDiv').css('display', 'none');
      $('.dropdown-toggle').removeClass('activeA');
    };
    // toggle = () => {
    //   this.setState({ collapsed: !this.state.collapsed de
    // }

    render() {
      // console.log(this.props.nav.menu);
      // this.props.nav.menu
      return (
        <aside className={this.props.internal.collapsed === true ? 'appNavbar' : 'packNavbar'} >
          <div className="title">
            <a>
              <img src={logoImg} className="logo" alt="" />
            </a>
          </div>
          <section className="" onMouseLeave={this.pointerleave}>
            <ul className="nav nav-list">
              <li className="liClass" onMouseEnter={e => this.hoverLi(e)} />
              {
                this.state.menu.map(v => (
                  <li className="liClass" onMouseEnter={e => this.hoverLi(e, v.children ? v.children.length : 0)} key={v.id.toString()} >
                    {v.children ?
                      <a className="dropdown-toggle" >
                        <i className={v.icon} />
                        <span className="menu-text"> {v.name} </span>
                      </a> :
                      <a onClick={() => this.props.baseActions.linkTo(v.path)} className="dropdown-toggle">
                        <i className={v.icon} />
                        <span>{v.name} </span>
                      </a>
                  }
                    <div className="submenuDiv" >
                      {
                        v.children && v.children.map((datas, index) => (
                          <div className="menuDiv" key={datas.id.toString()}>
                            <div className="first">
                              <div className="round" />
                              <span>{datas.name}</span>
                            </div>
                            <ul className="submenu" >
                              {
                                datas.children && datas.children.map(data =>
                                     (<li className="singleLine" key={data.id.toString()}><NavLink to={{ pathname: data.path, search: '' }} onClick={this.clickHref} className="jumpNavlist"> {data.name} </NavLink> </li>)
                                )
                            }
                            </ul>
                            {
                                index !== v.children.length - 1 ? <div className="dashLine" /> : null
                            }

                          </div>
                        ))
                    }
                    </div>
                  </li>
                ))
            }
            </ul>
          </section>
        </aside>

      );
    }
}

import React, { Component } from 'react';
import { Table, Modal, Popconfirm } from 'antd';
// import { observer, removeObserver } from 'notificationcenter';
import { Selecter } from '../../tomatobean';
import BaseActions, { Notification, Tabbar } from '../../tomatobean/enhance';
import SearchBar from '../../components/searchbar/index';
import SpecificModal from './createUserModal/index.jsx';
import { del } from '../../models/worker';
import './style.less';

const columns = target => [
  {
    title: '账号',
    dataIndex: 'userName',
    key: 'userName',
  }, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
  }, {
    title: '所属机构',
    dataIndex: 'orgName',
    key: 'orgName',
  }, {
    title: '创建人',
    dataIndex: 'createUser',
    key: 'createUser',
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span className="table-operation" onClick={() => target.edit(record)}>编辑</span>
        <span className="ant-divider" />
        <Popconfirm title="确定要删除机构？" onConfirm={() => target.del(record)} okText="是" cancelText="否">
          <span className="table-operation">删除</span>
        </Popconfirm>
      </span>
    ),
  },
];
@Tabbar()
@BaseActions
@Selecter(['worker'], { del })
@Notification
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {},
      visible: false,
      columns: columns(this),
      params: {
        pageNum: 1,
        pageSize: 10,
      },
    };
    this.createBtnClick = this.createBtnClick.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  componentDidMount() {
    // this.loadData();
    const { observer } = this.props.notification;
    observer('ob', (e) => {
      console.log(e);
    });
  }
  edit(record) {
    this.setState({
      record,
      visible: true,
    });
    this.props.baseActions.rollBack('worker');
  }
  createCargo = () => {
    const { linkTo } = this.props.baseActions;
    linkTo({ pathname: '/worker-manager2' });
  }
  del(record) {
    const { actions } = this.props;
    actions.del({ userCode: record.userCode }).then((resp) => {
      if (resp.success) {
        this.loadData();
      }
    });
  }
  loadData(params) {
    this.changeParams(params);
    const { actions } = this.props;
    actions.queryList(this.state.params, { model: 'worker', cache: true });
  }
  //
  changeParams(params) {
    if (typeof (params) === 'object') {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const element = params[key];
          this.state.params[key] = element;
        }
      }
    }
  }
  createBtnClick() {
    window.location.href = 'http://localhost:6666/storesCargo';
    // this.props.tabbarActions.tabBarDecrement({ pathname: '/worker-manager1' });
    // this.setState({
    //   visible: true,
    //   record: null,
    // });
  }
  hideModal() {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { list, total, code } = this.props.worker;
    // console.log(this.props);
    console.log(code);

    return (
      <div className="worker_view_container page" >
        <div className="view-operation-bar">
          <SearchBar
            placeholder="输入用户名称"
            clickSearch={() => this.loadData({ pageNum: 1, pageSize: 10 })}
            onPressEnter={() => this.loadData({ pageNum: 1, pageSize: 10 })}
            onChange={(e) => { this.state.params.username = e.target.value; }}
          />
          <p className="create-button" onClick={this.createCargo}>+新增</p>
          <p className="create-button" onClick={this.createBtnClick}>+新增员工</p>
        </div>
        <Table
          className="view-data-table"
          dataSource={list}
          columns={this.state.columns}
          rowKey="id"
          scroll={{ x: 900 }}
          pagination={{
                      total,
                      current: this.state.params.pageNum,
                      showSizeChanger: true,
                      pageSize: this.state.params.pageSize,
                      onChange: (pageNum) => {
                        // console.log("Current: ", current);
                        this.loadData({ pageNum });
                      },
                      onShowSizeChange: (pageNum, pageSize) => {
                        this.loadData({ pageNum, pageSize });
                      },
                    }}
        />
        <Modal
          visible={this.state.visible}
          footer={null}
          closable={false}
          className="custom-modal"
        >
          {
            this.state.visible
            && <SpecificModal
              dataSource={this.state.record}
              hideModal={this.hideModal}
              refresh={this.loadData}
            />
          }
        </Modal>
      </div>
    );
  }
}

module.exports = View;

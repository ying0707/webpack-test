import React, { Component } from 'react';
import { Form, Input, TreeSelect, Select, message } from 'antd';
import { postNotification } from 'notificationcenter';
import { Selecter } from '../../../tomatobean';
import ajax from '../../../util/ajax';
import './style.less';

const FormItem = Form.Item;

const disabledTreeData = arr => arr.map((x) => {
  x.disabled = true;
  if (x.children && x.children.length > 0) {
    disabledTreeData(x.children);
  }
  return true;
});

const changeData = (arr, selfId) => {
  const treeArr = arr.map((x) => {
    const level = {};
    level.key = x.id;
    level.value = x.id.toString();
    level.label = x.name;
    if (x.id === selfId) {
      x.disabled = true;
      if (x.children && x.children.length > 0) {
        disabledTreeData(x.children);
      }
    }
    level.disabled = x.disabled;
    if (x.children && x.children.length > 0) {
      level.children = changeData(x.children, selfId);
    }
    return level;
  });
  return treeArr;
};
@Selecter(['worker'])
class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgTree: [],
      roles: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (this.props.dataSource) {
      this.getImRolesByOrgId(this.props.dataSource.orgId);
    }
    ajax({
      url: `${host}/org/orgTree`,
      method: 'GET',
    }, (json) => {
      if (json.success) {
        this.setState({
          orgTree: changeData([json.data]),
        });
      } else {
        message.error(json.message);
      }
    }, (err) => {
    });
  }
  getImRolesByOrgId(orgId) {
    ajax({
      url: `${host}/role/queryImRolesByOrgId`,
      method: 'GET',
      data: {
        orgId,
      },
    }, (json) => {
      if (json.success) {
        this.setState({
          roles: json.data,
        });
      } else {
        message.error(json.message);
      }
    }, (err) => {
    });
  }
  handleSubmit() {
    postNotification('ob', 'SB');
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        const values = JSON.parse(JSON.stringify(fields));
        let params = {
          url: `${host}/user/addUser`,
          method: 'POST',
          data: JSON.stringify(values),
        };
        if (this.props.dataSource) {
          values.userCode = this.props.dataSource.userCode;
          params = {
            url: `${host}/user/update`,
            method: 'PUT',
            data: JSON.stringify(values),
          };
        }
        // POST
        ajax(params, (json) => {
          if (json.success) {
            message.success(json.message);
            this.props.refresh();
            this.props.hideModal();
          } else {
            message.error(json.message);
          }
        }, (err) => {
        });
      }
    });
  }
  handleChange(value) {
    this.getImRolesByOrgId(value);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { roles } = this.state;
    console.log(this.props.worker.list);
    return (
      <div className="specific_modal">
        <p className="modal_title">{this.props.dataSource ? '编辑用户' : '新增用户'}</p>
        <Form>
          <FormItem className="style_formItem">
            <span className="formItem_start">账号</span>
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: '请填写机构名称!' },
              ],
              initialValue: this.props.dataSource ? this.props.dataSource.userName : null,
            })(
              <Input placeholder="请填写机构名称" />
            )}
          </FormItem>
          <FormItem className="style_formItem">
            <span className="formItem_start">姓名</span>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '请填写机构名称!' },
              ],
              initialValue: this.props.dataSource ? this.props.dataSource.name : null,
            })(
              <Input placeholder="请填写机构名称" />
            )}
          </FormItem>
          <FormItem className="style_formItem">
            <span className="formItem_start">手机号</span>
            {getFieldDecorator('mobile', {
              rules: [
                { required: true, message: '请填写手机号!' },
              ],
              initialValue: this.props.dataSource ? this.props.dataSource.mobile : null,
            })(
              <Input placeholder="请填写手机号" />
            )}
          </FormItem>
          <FormItem className="style_formItem">
            <span className="formItem_start">机构</span>
            {getFieldDecorator('orgId', {
              rules: [{
                required: true, message: '请选择机构!',
              }],
              initialValue: this.props.dataSource ? this.props.dataSource.orgId.toString() : undefined,
            })(
              <TreeSelect
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={this.state.orgTree}
                placeholder="请选择机构"
                onChange={this.handleChange}
                treeDefaultExpandAll
              />
            )}
          </FormItem>
          <FormItem className="style_formItem">
            <span className="formItem_start">角色</span>
            {getFieldDecorator('userRole', {
            rules: [{
              required: true, message: '请选择角色!',
            }],
            initialValue: this.props.dataSource ? this.props.dataSource.userRole : undefined,
          })(
            <Select
              style={{ width: '100%' }}
              placeholder="请选择角色"
            >
              {roles.map(x => <Select.Option key={x.id.toString()} value={x.id.toString()}>{x.name}</Select.Option>)}
            </Select>
          )}
          </FormItem>
          <div className="bar_buttons">
            <span className="backButton" onClick={this.props.hideModal}>取消</span>
            <span className="okButton" onClick={this.handleSubmit}>确定</span>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Comp);

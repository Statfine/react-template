/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { DatePicker, Button, Upload, Icon, message, Modal } from 'antd';

import UploadImg from 'components/UploadImg';

import { makeSelectLogined, makeSelectUserInfo } from '../App/selectors';
import { loginOut } from '../App/actions';
import { CURRENT_ENV, CURRENT_QA } from '../../common/constants';

const Content = styled.div`
  padding: 40px;
  background: #e3e3e3;
`;
const P = styled.p`
  font-size: 16px;
`;
const P1 = styled.p`
  font-size: 14px;
  margin-left: 40px;
  color: #666;
`;

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  state = {
    date: '',
    imageUrl: '',
    previewVisible: false,
    fileList: [],
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }

  handleJumpLogin = () => {
    const { logined, history } = this.props;
    if (!logined) history.push('/login');
  };

  handleChange(date) {
    this.setState({ date });
  }

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    console.log(file);
    return isJPG && isLt2M;
  }

  handleUpload = (file) => {
    console.log('file', file);
  }
  
  handleChange = (info) => {
    console.log('info', info);
  }

  handleDelete = (obj) => {
    alert('delete', obj);
    console.log(obj);
  }

  handleFileChange = (list) => this.setState({ fileList: list });

  render() {
    const { logined, actionLoginOut, userInfo } = this.props;
<<<<<<< HEAD
    const { imageUrl, previewVisible, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
=======
    console.log(CURRENT_QA);
>>>>>>> master
    return (
      <div>
        <Helmet>
          <title>首页</title>
        </Helmet>
        {CURRENT_ENV}
        <div>{CURRENT_QA}</div>
        {logined ?
          (<div onClick={actionLoginOut}>点击退出用户:{userInfo.user.clip_id}</div>) :
          (<div onClick={this.handleJumpLogin}>点击去登陆</div>)
        }
        <h1>HomePage</h1>
        <Content>
          <P>1.页面入口app通过auth判断哪些页面需要用户验证可以登录，哪些不能</P>
          <P1>1.1 userIsAuthenticatedRedir 需要登录，不然跳转 / (dashborad页面必须登录，则重定向会/)</P1>
          <P1>1.2 userIsNotAuthenticatedRedir 需要未登录，不然跳转 / (登录页面必须未登录，则重定向会/)</P1>
          <P>2.App中action和saga为全局，需注意saga中的用户获取和Token刷新逻辑</P>
          <P1>2.1 fetchUserInfoWatcher内部判断是否获取用户信息</P1>
          <P1>2.2 tokenSagaWatcher 判断是否刷新token</P1>
        </Content>
        <div style={{ marginLeft: '300px' }}><DatePicker onChange={value => this.handleChange(value)} /></div>
        <Button type="primary">Primary</Button>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={this.handleUpload}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
          <img alt="example" style={{ width: '100%' }} src="https://cloud-clip-img.oss-cn-hangzhou.aliyuncs.com/snapshot/a6e8b594-900f-42bf-b02a-9856d2745a3a-2136.png" />
        </Modal>
        <UploadImg
          handleDelete={this.handleDelete}
          handleChange={this.handleFileChange}
          fileList={fileList}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object,
  logined: PropTypes.bool,
  actionLoginOut: PropTypes.func,
  userInfo: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  logined: makeSelectLogined(),
  userInfo: makeSelectUserInfo(),
});

function mapDispatchToProps(dispatch) {
  // eslint-disable-line
  return {
    actionLoginOut: () => dispatch(loginOut()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);

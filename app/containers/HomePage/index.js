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

import { makeSelectLogined, makeSelectUserInfo } from '../App/selectors';
import { loginOut } from '../App/actions';

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
  handleJumpLogin = () => {
    const { logined, history } = this.props;
    if (!logined) history.push('/login');
  };

  render() {
    const { logined, actionLoginOut, userInfo } = this.props;
    return (
      <div>
        <Helmet>
          <title>首页</title>
        </Helmet>
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

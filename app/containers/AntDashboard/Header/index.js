/**
 * 搜索结果页头部
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loginOut } from 'containers/App/actions';
import {
  makeSelectUserBase,
  makeSelectLogined,
} from 'containers/App/selectors';
import { Icon } from 'antd';

import { HeaderContainer, Part, JumpP, Title } from './styled';

class HeaderCom extends PureComponent {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { userInfo, onLogout, collapsed, onHandleChangeCollapsed } = this.props;
    return (
      <HeaderContainer>
        <Part>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => onHandleChangeCollapsed(!collapsed)}
          />
        </Part>
        <Part>
          <Title>{userInfo.name || userInfo.email || 'loading...'}</Title>
          <JumpP onClick={onLogout}>退出</JumpP>
        </Part>
      </HeaderContainer>
    );
  }
}

/*
 * userInfo 用户信息用作显示
 * onLogout 退出方法
 * logined 判断用户当前是否登录
 * 
 * collapsed 侧边栏状态 true收起  false展开
 * onHandleChangeCollapsed
 * 
*/
HeaderCom.propTypes = {
  userInfo: PropTypes.object,
  // logined: PropTypes.bool,
  onLogout: PropTypes.func,
  collapsed: PropTypes.bool,
  onHandleChangeCollapsed: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserBase(),
  logined: makeSelectLogined(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => {
      dispatch(loginOut());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderCom);

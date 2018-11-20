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
import { Avatar, Menu, Dropdown } from 'antd';

import Logo from './logo.png';

import { HeaderContainer, Part, JumpP, ImgP, Title, LogoImg } from './styled';

class HeaderCom extends PureComponent {
  handleJump = url => {
    const { onLogout } = this.props;
    if (onLogout) this.context.history.push(url);
    else this.handleLogin();
  };

  handleLogin = () => this.context.history.push('/login');

  handleuserMenu = () => (
    <Menu>
      <Menu.Item key="3" onClick={this.props.onLogout}>
        退出
      </Menu.Item>
    </Menu>
  );

  render() {
    const { userInfo, logined } = this.props;
    return (
      <HeaderContainer>
        <Part>
          <Part onClick={() => this.context.history.push('/')}>
            <LogoImg src={Logo} />
            <ImgP>Home</ImgP>
          </Part>
          <JumpP onClick={() => this.context.history.push('/doc')}>
            doc
          </JumpP>
          <JumpP onClick={() => this.handleJump('/dashboard')}>dashboard</JumpP>
        </Part>
        {logined ? (
          <Dropdown overlay={this.handleuserMenu()} trigger={['click']}>
            <Part>
              <Avatar>USER</Avatar>
              <Title>
                {userInfo.name ||
                  userInfo.email ||
                  'loading...'}
              </Title>
            </Part>
          </Dropdown>
        ) : (
          <JumpP onClick={this.handleLogin}>登录</JumpP>
        )}
      </HeaderContainer>
    );
  }
}

HeaderCom.contextTypes = {
  history: PropTypes.object,
};

/*
 * userInfo 用户信息用作显示
 * onLogout 退出方法
 * logined 判断用户当前是否登录
 * 
*/
HeaderCom.propTypes = {
  userInfo: PropTypes.object,
  logined: PropTypes.bool,
  onLogout: PropTypes.func,
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

/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Menu, Icon } from 'antd';
import history from 'utils/history';

import picLogo from '../images/logo.png';
const { SubMenu } = Menu;
const { Sider } = Layout;

const LeftSilder = styled(Sider)`
  width: 200;
  background: #fff;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.12);
  z-index: 500;
  color: #4885ed;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  margin-bottom: -20px;
  overflow-y: auto;
`;

const LogoDiv = styled.div`
  // display: flex;
  // align-items: center;
  // height: 60px;
  // transition: all 0.5s;
  // background: #002140;
  // overflow: hidden;
  // & img {
  //   margin: 0 10px 0 24px;
  // }
  // & p {
  //   font-size: 18px;
  //   color: #fff;
  // }

  height: 64px;
  display: flex;
  align-items: center;
  position: relative;
  line-height: 64px;
  transition: all 0.3s;
  background: #002140;
  overflow: hidden;
  & img {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
    margin: 0 4px 0 24px;
  }
  & p {
    color: white;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-weight: 600;
    color: #fff;
  }
`;

const SubMenuTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const urlToList = (url) => {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}

/**
 *  type  单个或者数组 single list
 *  name 标题
 *  url 路径
 *  icon 图标
 */
const URL = [ // eslint-disable-line
  {
    type: 'list',
    name: 'Tab1',
    url: '/ant/one',
    icon: 'setting',
    listUrl: [
      {
        name: 'Tab1-1',
        url: '/ant/one/one',
      },
      {
        name: 'Tab1-2',
        url: '/ant/one/two',
      },
      {
        name: 'Tab1-3',
        url: '/ant/one/three',
      },
      {
        name: 'Tab1-4',
        url: '/ant/one/four',
      },
    ],
  },
  {
    type: 'list',
    name: 'Tab2',
    url: '/ant/two',
    icon: 'message',
    listUrl: [
      {
        name: 'Tab2-1',
        url: '/ant/two/one',
      },
    ],
  },
  {
    type: 'single',
    name: '权限设置',
    url: '/ant/auth',
    icon: 'key',
  },
  {
    type: 'single',
    name: '个人设置',
    url: '/ant/own',
    icon: 'setting',
  },
]

/* eslint-disable react/prefer-stateless-function */
class LeftNav extends React.PureComponent {
  /**
   *  openKey 页面初始值，Item点击跳转之后改变
   *  collapsed 侧边栏的开启与关闭
   */
  state = {
    openKey: [],
  }

  // Menud 点击
  onHandleSelect = (openKey) => this.setState({ openKey });

  // ITEM点击
  onJump = (url, openKey = []) => {
    history.push(url);
    this.setState({ openKey })
  }

  // Get the currently selected menu
  getSelectedMenuKeys = pathname => urlToList(pathname);

  // 渲染单个个menu
  renderSingleMenu = item => (
    <Menu.Item key={item.url} onClick={() => this.onJump(item.url)}>
      <Icon type={item.icon} />
      <span>{item.name}</span>
    </Menu.Item>
  )

  // 渲染组合menu
  renderListMeny = item => (
    <SubMenu
      key={item.url}
      title={
        <SubMenuTitle>
          <Icon type={item.icon} />
          <span>{item.name}</span>
        </SubMenuTitle>
      }
    >
      {
        item.listUrl.map((i) => (
          <Menu.Item
            key={i.url}
            onClick={() => this.onJump(i.url)}
          >{i.name}</Menu.Item>
        ))
      }
    </SubMenu>
  )

  render() {
    const {
      location: { pathname },
      collapsed,
    } = this.props;
    const { openKey } = this.state;
    const selectedKeys = this.getSelectedMenuKeys(pathname);
    const props = collapsed ? {} : { openKeys: openKey.length === 0 ? selectedKeys : openKey };
    return (
      <LeftSilder trigger={null} collapsible collapsed={collapsed}>
        <LogoDiv id="logo" onClick={() => this.onJump('/')}>
          <img src={picLogo} alt="logo" />
          {!collapsed && <p>管理后台</p>}
        </LogoDiv>
        <Menu
          key="Menu"
          mode="inline"
          theme="dark"
          selectedKeys={selectedKeys}
          onOpenChange={this.onHandleSelect}
          style={{ height: '100%', borderRight: 0 }}
          {...props}
        >
          {
            URL.map((item) => (
              item.type === 'single' ? 
                this.renderSingleMenu(item) : this.renderListMeny(item)
            ))
          }
        </Menu>
      </LeftSilder>
    );
  }
}

LeftNav.propTypes = {
  location: PropTypes.object,
  collapsed: PropTypes.bool,
};

export default LeftNav;

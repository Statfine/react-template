/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Header from 'components/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const AppWrapper = styled(Layout)`
  height: 100%;
  width: 100%;
  padding-top: 50px;
`;

const RightLayout = styled(Layout)`
  padding: 24px;
`;

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
const WrapperContent = styled(Content)`
  background: #fff;
  padding: 24;
  margin: 0;
  min-height: 280px;
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
    type: 'single',
    name: 'Option 1',
    url: '/dashboard/option',
    icon: 'pie-chart',
  },
  {
    type: 'list',
    name: 'Option 2',
    url: '/dashboard/part',
    icon: 'user',
    listUrl: [
      {
        name: 'one',
        url: '/dashboard/part/one',
      },
      {
        name: 'two',
        url: '/dashboard/part/two',
      },
    ],
  },
  {
    type: 'list',
    name: 'Option 3',
    url: '/dashboard/edit',
    icon: 'user',
    listUrl: [
      {
        name: 'one',
        url: '/dashboard/edit/one',
      },
      {
        name: 'two',
        url: '/dashboard/edit/two',
      },
    ],
  },
  {
    type: 'single',
    name: 'Option 4',
    url: '/dashboard/user',
    icon: 'pie-chart',
  },
]

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  /**
   *  openKey 页面初始值，Item点击跳转之后改变
   *  collapsed 侧边栏的开启与关闭
   */
  state = {
    openKey: [],
    collapsed: false,
  }

  // Menud 点击
  onHandleSelect = (openKey) => this.setState({ openKey });

  // ITEM点击
  onJump = (url, openKey = []) => {
    this.props.history.push(url);
    this.setState({ openKey })
  }

  // Get the currently selected menu
  getSelectedMenuKeys = pathname => urlToList(pathname);

  render() {
    const {
      location: { pathname },
    } = this.props;
    const { openKey, collapsed } = this.state;
    const selectedKeys = this.getSelectedMenuKeys(pathname);
    const props = collapsed ? {} : { openKeys: openKey.length === 0 ? selectedKeys : openKey };
    return (
      <AppWrapper>
        <Helmet>
          <title>控制面板</title>
        </Helmet>
        <Header />
        <Layout>
          <LeftSilder
            trigger={null}
            collapsible
            collapsed={collapsed} 
          >
            <Menu
              key="Menu"
              mode="inline"
              selectedKeys={selectedKeys}
              onOpenChange={this.onHandleSelect}
              style={{ height: '100%', borderRight: 0 }}
              {...props}
            > 
              <Menu.Item key="/dashboard/option" onClick={() => this.onJump('/dashboard/option')}>
                <Icon type="pie-chart" />
                <span>Option 1</span>
              </Menu.Item>
              <SubMenu
                key="/dashboard/part"
                title={<div style={{ display: 'flex', alignItems: 'center' }}><Icon type="setting" /><span>Option 2</span></div>}
              >
                <Menu.Item key="/dashboard/part/one" onClick={() => this.onJump('/dashboard/part/one')}>one</Menu.Item>
                <Menu.Item key="/dashboard/part/two" onClick={() => this.onJump('/dashboard/part/two')}>two</Menu.Item>
                <Menu.Item key="" onClick={() => this.onJump('/dashboard/part')}>404</Menu.Item>
              </SubMenu>
              <SubMenu
                key="/dashboard/edit"
                title={<div style={{ display: 'flex', alignItems: 'center' }}><Icon type="setting" /><span>Option 3</span></div>}
              >
                <Menu.Item key="/dashboard/edit/one" onClick={() => this.onJump('/dashboard/edit/one')}>one</Menu.Item>
                <Menu.Item key="/dashboard/edit/two" onClick={() => this.onJump('/dashboard/edit/two')}>two</Menu.Item>
              </SubMenu>
              <Menu.Item key="/dashboard/user" onClick={() => this.onJump('/dashboard/user')}>
                <Icon type="pie-chart" />
                <span>Option 4</span>
              </Menu.Item>
            </Menu>
          </LeftSilder>
          <RightLayout>
            <WrapperContent>
              
              <Switch>
                <Route
                  exact
                  path={this.props.match.url}
                  render={() => <Redirect to={`${this.props.match.path}/option`} />}
                />
                <Route
                  path={`${this.props.match.path}/option`}
                  component={() => <div>option</div>}
                />
                <Route
                  path={`${this.props.match.path}/part/one`}
                  component={() => <div>One</div>}
                />
                <Route
                  path={`${this.props.match.path}/part/two`}
                  component={() => <div>Two</div>}
                />
                <Route
                  path={`${this.props.match.path}/edit/one`}
                  component={() => <div>edit One</div>}
                />
                <Route
                  path={`${this.props.match.path}/edit/two`}
                  component={() => <div>edit Two</div>}
                />
                <Route
                  path={`${this.props.match.path}/user`}
                  component={() => <div>user</div>}
                />
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </WrapperContent>
          </RightLayout>
        </Layout>
      </AppWrapper>
    );
  }
}

Dashboard.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {  // eslint-disable-line
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);

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

const RightNav = styled(Layout)`
  padding: 24px;
`;

const LeftNav = styled(Sider)`
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
const Wrapper = styled(Content)`
  background: #fff;
  padding: 24;
  margin: 0;
  min-height: 280px;
`;

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  onJump = url => this.props.history.push(url);

  render() {
    return (
      <AppWrapper>
        <Helmet>
          <title>控制面板</title>
        </Helmet>
        <Header />
        <Layout>
          <LeftNav>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={<span><Icon type="user" />subnav 1</span>}
              >
                <Menu.Item key="1" onClick={() => this.onJump('/dashboard')}>dashboard</Menu.Item>
                <Menu.Item key="2" onClick={() => this.onJump('/dashboard/one')}>one</Menu.Item>
                <Menu.Item key="3" onClick={() => this.onJump('/dashboard/two')}>two</Menu.Item>
                <Menu.Item key="4" onClick={() => this.onJump('/dashboard/three')}>404</Menu.Item>
              </SubMenu>
            </Menu>
          </LeftNav>
          <RightNav>
            <Wrapper>
              <Switch>
                <Route
                  exact
                  path={this.props.match.url}
                  component={() => <div>home</div>}
                />
                <Route
                  path={`${this.props.match.path}/one`}
                  component={() => <div>One</div>}
                />
                <Route
                  path={`${this.props.match.path}/two`}
                  component={() => <div>Two</div>}
                />
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </Wrapper>
          </RightNav>
        </Layout>
      </AppWrapper>
    );
  }
}

Dashboard.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
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

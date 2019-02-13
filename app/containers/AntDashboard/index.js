/**
 *
 * AntDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAntDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';

import Header from './Header';
import LeftNav from './LeftNav';

const { Content } = Layout;

const AppWrapper = styled(Layout)`
  height: 100%;
  width: 100%;
`;

const RightLayout = styled(Layout)`
`;
const WrapperContent = styled(Content)`
  background: #fff;
  margin: 25px;
  min-height: 280px;
`;

/* eslint-disable react/prefer-stateless-function */
export class AntDashboard extends React.PureComponent {
  state = {
    collapsed: false, // 侧边栏状态 true收起  false展开
  }

  handleChangeCollapsed = collapsed => this.setState({ collapsed });

  render() {
    const { collapsed } = this.state;
    console.log(this.props.match);
    return (
      <AppWrapper>
        <Helmet>
          <title>控制面板</title>
        </Helmet>
        <Layout>
          <LeftNav
            location={this.props.location}
            history={this.props.history}
            collapsed={collapsed}
          />
          <RightLayout>
            <Header collapsed={collapsed} onHandleChangeCollapsed={this.handleChangeCollapsed} />
            <WrapperContent>
              <Switch>
                <Route
                  exact
                  path={this.props.match.url}
                  // component={LoadingIndicator}
                  component={() => (<div>Admin</div>)}
                  // render={() => <Redirect to={`${this.props.match.path}/trans/grablist`} />}
                />
                <Route
                  path={`${this.props.match.path}/one/one`}
                  component={() => <div>Tab1-1</div>}
                />
                <Route
                  path={`${this.props.match.path}/one/two`}
                  component={() => <div>Tab1-2</div>}
                />
                <Route
                  path={`${this.props.match.path}/one/three`}
                  component={() => <div>Tab1-3</div>}
                />
                <Route
                  path={`${this.props.match.path}/one/four`}
                  component={() => <div>Tab1-4</div>}
                />
                <Route
                  path={`${this.props.match.path}/two/one`}
                  component={() => <div>Tab2-1</div>}
                />
                <Route
                  path={`${this.props.match.path}/auth`}
                  component={() => <div>权限设置</div>}
                />
                <Route
                  path={`${this.props.match.path}/own`}
                  component={() => <div>个人设置</div>}
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

AntDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired, // eslint-disable-line
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  antDashboard: makeSelectAntDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'antDashboard', reducer });
const withSaga = injectSaga({ key: 'antDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AntDashboard);

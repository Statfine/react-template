/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';

import HomePage from 'containers/HomePage/Loadable';
import Login from 'containers/Login/Loadable';
import Dashborad from 'containers/Dashboard/Loadable';
import AntDashborad from 'containers/AntDashboard/Loadable';
import DocPage from 'containers/DeveloperDoc/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoadingIndicator from 'components/LoadingIndicator';

import saga from './saga';
import reducer from './reducer';

import GlobalStyle from '../../global-styles';

import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir,
} from '../../auth/auth';

/*
 * 是否登录的判断条件是reducer logined
 * userIsAuthenticatedRedir 需登录后才能打开的页面,否则重定向到 /
 * userIsNotAuthenticatedRedir 未登录才能打开，否则重新向到 ／
 */
const LoginPage = userIsNotAuthenticatedRedir(Login);
const DashboardPage = userIsAuthenticatedRedir(Dashborad);
const styleApp = {
  height: '100vh',
  width: '100vw',
}
class App extends React.Component {
  state = {};

  /**
   * 可用context  
   * 可用withRouter 
   * 推荐utils/history
   */
  getChildContext() {
    return { history: this.props.history };
  }

  render() {
    return (
      <div style={styleApp}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/ant" component={AntDashborad} />
          <Route path="/doc" component={DocPage} />
          <Route path='/loading' component={LoadingIndicator} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    );
  }
}

App.childContextTypes = {
  history: PropTypes.object,
};
App.propTypes = {
  history: PropTypes.object, // eslint-disable-line
};

const withSaga = injectSaga({ key: 'app', saga, mode: DAEMON });
const withReducer = injectReducer({ key: 'app', reducer });

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) { // eslint-disable-line
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(compose(withReducer, withSaga, withConnect)(App));

// export default function App() {
//   return (
//     <div>
//       <Switch>
//         <Route exact path="/" component={HomePage} />
//         <Route component={NotFoundPage} />
//       </Switch>
//       <GlobalStyle />
//     </div>
//   );
// }

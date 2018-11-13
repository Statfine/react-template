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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';

import { loginOut } from '../App/actions';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  render() {
    const { actionLoginOut } = this.props;
    return (
      <div>
        <Helmet><title>控制面板</title></Helmet>
        <div onClick={actionLoginOut}>logout</div>
        <div>Dashboard</div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  actionLoginOut: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    actionLoginOut: () => dispatch(loginOut()),
  };
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

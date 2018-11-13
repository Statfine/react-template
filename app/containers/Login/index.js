/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';

import { loginAction } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Login extends React.PureComponent {
  render() {
    const { onAuthLogin } = this.props;
    return (
      <div>
        LoginPage
        <div onClick={onAuthLogin}>Login</div>
      </div>
    );
  }
}

Login.propTypes = {
  onAuthLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAuthLogin: () => dispatch(loginAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);

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

import { makeSelectLogined } from '../App/selectors';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  handleJumpLogin = () => {
    const { logined, history } = this.props;
    if (!logined) history.push('/login');
  }

  render() {
    const { logined } = this.props; 
    return (
      <div>
        <Helmet><title>首页</title></Helmet>
        <div onClick={this.handleJumpLogin}>{logined ? '已登录' : '去登陆'}</div>
        <h1>HomePage</h1>
      </div>
    );
  }
}

HomePage.propTypes = {
  logined: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  logined: makeSelectLogined(),
});

function mapDispatchToProps(dispatch) { // eslint-disable-line
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);

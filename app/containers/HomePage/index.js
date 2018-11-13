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

import { makeSelectLogined, makeSelectUserInfo } from '../App/selectors';
import { loginOut } from '../App/actions';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  handleJumpLogin = () => {
    const { logined, history } = this.props;
    if (!logined) history.push('/login');
  };

  render() {
    const { logined, actionLoginOut, userInfo } = this.props;
    return (
      <div>
        <Helmet>
          <title>首页</title>
        </Helmet>
        {logined ?
          (<div onClick={actionLoginOut}>退出用户:{userInfo.user.clip_id}</div>) :
          (<div onClick={this.handleJumpLogin}>去登陆</div>)
        }
        <h1>HomePage</h1>
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object,
  logined: PropTypes.bool,
  actionLoginOut: PropTypes.func,
  userInfo: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  logined: makeSelectLogined(),
  userInfo: makeSelectUserInfo(),
});

function mapDispatchToProps(dispatch) {
  // eslint-disable-line
  return {
    actionLoginOut: () => dispatch(loginOut()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);

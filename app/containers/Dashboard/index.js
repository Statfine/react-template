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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';

import { loginOut } from '../App/actions';

const Content = styled.div`
  padding: 40px;
  background: #e3e3e3;
`;
const P = styled.p`
  font-size: 16px;
`;
const P1 = styled.p`
  font-size: 14px;
  margin-left: 40px;
  color: #666;
`;
const INPUT = styled.input`
  font-size: 14px;
  margin-left: 40px;
  border: 1px solid #e3e3e3;
  color: #666;
`;

const Button = styled.button`

`;

// Example HOC
function withTheme(ThemedComponent) {
  // function ThemeContextInjector(props) {
  //   return (
  //     <ThemeContext.Consumer>
  //       {value => (
  //         <ThemedComponent {...props} ref={props.forwardedRef} theme={value} />
  //       )}
  //     </ThemeContext.Consumer>
  //   );
  // }
  function ThemeContextInjector(props) {
    return (<ThemedComponent {...props} ref={props.forwardedRef} />);
  }

  // Forward refs through to the inner, "themed" component:
  return React.forwardRef((props, ref) => (
    <ThemeContextInjector {...props} forwardedRef={ref} />
  ));
}
const ThemedButton = withTheme(Button);

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.buttonRef = React.createRef();
  }

  UNSAFE_componentWillMount() { // eslint-disable-line
    console.log('UNSAFE_componentWillMount');
  }

  componentDidMount() {
    console.log(this.divRef);
    this.divRef.current.focus()
  }

  UNSAFE_componentWillReceiveProps(nextProps) { // eslint-disable-line
    console.log('UNSAFE_componentWillReceiveProps', nextProps);
  }

  render() {
    const { actionLoginOut } = this.props;
    return (
      <div>
        <Helmet><title>控制面板</title></Helmet>
        <Content>
          <P>1.ref</P>
          <P1>1.1 React.createRef()</P1>
          <P1>1.2 this.divRef.current</P1>
          <P>2.forwardRef</P>
          <P1>2.1 React.forwardRef()</P1>
          <P>3.UNSAFE_</P>
          <P1>3.1 ADD getDerivedStateFromProps()</P1>
          <P1>3.2 ADD getSnapshotBeforeUpdate()</P1>
          <P1>3.3 UNSAFE_componentWillMount</P1>
          <P1>3.4 UNSAFE_componentWillReceiveProps</P1>
          <P1>3.5 UNSAFE_componentWillUpdate</P1>
        </Content>
        <div onClick={actionLoginOut}>logout</div>
        {/* <input type="text" ref={this.divRef} /> */}
        <INPUT type="text" ref={this.divRef} />
        <ThemedButton ref={this.buttonRef} onClick={actionLoginOut}>ClickME logout</ThemedButton>
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

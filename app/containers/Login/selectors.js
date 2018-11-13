import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the login state domain
 */

const selectLoginDomain = state => state.get('login', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeSelectLogin = () =>
  createSelector(selectLoginDomain, substate => substate.toJS());

const selectUserName = () =>
  createSelector(selectLoginDomain, authState => authState.get('username'));

const selectPassword = () =>
  createSelector(selectLoginDomain, authState => authState.get('password'));

export default makeSelectLogin;
export { selectLoginDomain, selectUserName, selectPassword };

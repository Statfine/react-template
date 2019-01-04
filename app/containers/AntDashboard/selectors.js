import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the antDashboard state domain
 */

const selectAntDashboardDomain = state =>
  state.get('antDashboard', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AntDashboard
 */

const makeSelectAntDashboard = () =>
  createSelector(selectAntDashboardDomain, substate => substate.toJS());

export default makeSelectAntDashboard;
export { selectAntDashboardDomain };

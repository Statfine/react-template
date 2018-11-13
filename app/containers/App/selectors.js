import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');
const selectAppRouter = state => state.get('app');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectLogined = () =>
  createSelector(selectAppRouter, routerState =>
    routerState.get('logined'),
  );

export { makeSelectLocation, makeSelectLogined };

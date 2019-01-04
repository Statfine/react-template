import { fromJS } from 'immutable';
import antDashboardReducer from '../reducer';

describe('antDashboardReducer', () => {
  it('returns the initial state', () => {
    expect(antDashboardReducer(undefined, {})).toEqual(fromJS({}));
  });
});

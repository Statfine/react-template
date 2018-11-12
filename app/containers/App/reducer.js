/*
 *
 * Form reducer
 *
 */

import { fromJS } from 'immutable';
import { LOGIN_SUCCESS } from './constants';

/*
 * logined Auth用户验证
*/

const initialState = fromJS({
  logined: true,
});

function formReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.set('logined', action.payload);
    default:
      return state;
  }
}

export default formReducer;

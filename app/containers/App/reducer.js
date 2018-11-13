/*
 *
 * Form reducer
 *
 */

import { fromJS } from 'immutable';
import * as con from './constants';

/*
 * logined Auth用户验证
*/

const initialState = fromJS({
  logined: false,
  promptInfo: {
    promptMsg: '',
    promptType: 0,
  },
});

function formReducer(state = initialState, action) {
  switch (action.type) {
    case con.LOGIN_SUCCESS:
      return state.set('logined', action.payload);
    case con.CHANGE_PROMPT_INFO:
      return state.mergeDeep(fromJS({ promptInfo: action.payload }));
    default:
      return state;
  }
}

export default formReducer;

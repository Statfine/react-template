/*
 *
 * Form reducer
 *
 */

import { fromJS } from 'immutable';
import { getLocal } from 'utility/localStorageCookie';
import * as con from './constants';

/*
 * logined Auth用户验证
*/
// 验证用户有效的条件是 必须有access_token 同时有效期大于当前
function isLogined() {
  return !!getLocal('access_token') && Date.now() < Number(getLocal('expires_in'));
}

/**
 *  logined 是否已有用户
 *  userInfo 用户信息
 *  promptInfo 全局提示信息
 */
const initialState = fromJS({
  logined: isLogined(),
  userInfo: {
    user: {
      clip_id: '',
    },
  },
  promptInfo: {
    promptMsg: '',
    promptType: 0,
  },
});

function formReducer(state = initialState, action) {
  switch (action.type) {
    case con.LOGIN_CHANGE:
      return state.set('logined', action.payload);
    case con.FETCH_USERINFO_SUC:
      return state.update('userInfo', (p) => p.mergeDeep(action.payload));
    case con.CHANGE_PROMPT_INFO:
      return state.mergeDeep(fromJS({ promptInfo: action.payload }));
    default:
      return state;
  }
}

export default formReducer;

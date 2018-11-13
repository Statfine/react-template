import { call, select, takeEvery, put } from 'redux-saga/effects';
// import { push } from 'connected-react-router/immutable';
import { setLocal } from 'utility/localStorageCookie';
import Api from './api';
import { LOGIN_ACTION } from './constants';
import { selectUserName, selectPassword } from './selectors';

import { changeLogined } from '../App/actions';

function* loginWatcher() {
  try {
    const username = yield select(selectUserName());
    const password = yield select(selectPassword());
    const result = yield call(Api.login, username, password);
    setLocal('access_token', result.access_token);
    setLocal('expires_in', Date.now() + (result.expires_in * 1000));
    setLocal('refresh_token', result.refresh_token);
    yield put(changeLogined(true));
    // yield put(push('/'));
  } catch (e) {
    //
  }
}

// Individual exports for testing
export default function* loginSaga() {
  yield takeEvery(LOGIN_ACTION, loginWatcher);
}

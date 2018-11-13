import { call, takeLatest, put } from 'redux-saga/effects';
import { clearLocal } from 'utility/localStorageCookie';
import { LOGIN_CHANGE, LOGIN_OUT } from './constants';

import Api from './api';
import { changeLogined } from './actions';

function* fetchLogin() {
  console.log('fetchLogin');
}

function* loginOutWatcher() {
  try {
    yield call(Api.userLogout);
    clearLocal();
    yield put(changeLogined(false));
  } catch (e) {
    //
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOGIN_CHANGE, fetchLogin);
  yield takeLatest(LOGIN_OUT, loginOutWatcher);
}

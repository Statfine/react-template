import { fork, call, takeLatest, put, select } from 'redux-saga/effects';
import { clearLocal } from 'utility/localStorageCookie';
import { LOGIN_CHANGE, LOGIN_OUT } from './constants';

import Api from './api';
import { changeLogined, fetchUserInfo } from './actions';
import { makeSelectLogined } from './selectors';

function* changeLoginWatcher() {
  yield [call(fetchUserInfoWatcher)];
}

function* fetchUserInfoWatcher() {
  const login = yield select(makeSelectLogined());
  if (login) {
    yield [
      call(fetchUserInfoSaga),
    ];
  }
}

export function* fetchUserInfoSaga() {
  try {
    const data = yield call(Api.fetchUserInfo);
    const { socials, policy, guides, kandian, tags, ...user } = data.data;
    yield put(fetchUserInfo({ user }));
  } catch (error) {
    console.log(error);
  }
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
  yield fork(fetchUserInfoWatcher);
  yield takeLatest(LOGIN_CHANGE, changeLoginWatcher);
  yield takeLatest(LOGIN_OUT, loginOutWatcher);
}

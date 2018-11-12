import { takeLatest } from 'redux-saga/effects';
import { LOGIN_SUCCESS } from './constants';

function* fetchLogin() {
  console.log('fetchLogin');
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOGIN_SUCCESS, fetchLogin);
}

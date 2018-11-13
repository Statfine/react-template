/*
 *
 * Login actions
 *
 */

import { DEFAULT_ACTION, LOGIN_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loginAction() {
  return {
    type: LOGIN_ACTION,
  };
}

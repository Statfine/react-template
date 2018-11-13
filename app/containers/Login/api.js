/*
 * Auth request staff
 */

import { API_BASE } from 'common/constants';
import request from 'utils/request';
import sha1 from 'sha1';
// import { setLocal } from 'utility/localStorageCookie';

const auth = {

  login(username, password) {
    const object = JSON.stringify({
      username,
      password: sha1(password),
      type: username.indexOf('@') !== -1 ? 'email' : 'mobile',
    });
    const options = {
      method: 'POST',
      body: object,
    };
    return request(`${API_BASE}/auth/login`, options)
      // .then((body) => {
      //   setLocal('access_token', body.data.access_token);
      //   setLocal('expires_in', Date.now() + (body.data.expires_in * 1000));
      //   setLocal('refresh_token', body.data.refresh_token);
      //   return true;
      // })
      .then((data) => data.data)
      .catch((err) => {
        throw new Error(err.data.code);
      });
  },
};

export default auth;

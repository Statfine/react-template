/*
 * Auth request staff
 */

import { API_BASE } from 'common/constants';
import request from 'utils/request';
import { getLocal } from 'utility/localStorageCookie';

const api = {
  // token 刷新
  refreshToken() {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: getLocal('refresh_token'),
      }),
    };

    return request(`${API_BASE}/auth/refresh`, options)
      .then((data) => data.data)
      .catch(() => {
        throw new Error('用户已过有效期');
      });
  },

  // 用户退出
  userLogout() {
    return request(`${API_BASE}/auth/logout`, {
      method: 'DELETE',
    });
  },

  // 获取用户信息
  fetchUserInfo() {
    return request(`${API_BASE}/users/info`).catch(() => {
      throw new Error('获取用户信息失败');
    });
  },
};

export default api;

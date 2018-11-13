/*
 * Auth request staff
 */

import { API_BASE } from 'common/constants';
import request from 'utils/request';

const api = {
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

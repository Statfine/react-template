/*
 * Auth request staff
 */

import { API_BASE } from 'common/constants';
import request from 'utils/request';

const api = {
  userLogout() {
    return request(`${API_BASE}/auth/logout`, {
      method: 'DELETE',
    });
  },
};

export default api;

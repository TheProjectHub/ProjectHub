/* eslint-disable */
import http from '../http-common';

class Users {
  get(identifier, token) {
    return http.get(`/users/${identifier}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  create(data, token) {
    return http.post('/users', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  update(id, data, token) {
    return http.put(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new Users();

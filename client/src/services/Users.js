/* eslint-disable */
import http from '../http-common';

class Users {
  get(id, token) {
    return http.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // get(id) {
  //   return http.get(`/users/${id}`);
  // }

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

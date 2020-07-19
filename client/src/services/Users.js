import http from '../../http-common';

class Users {
  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return http.post('/users', data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }
}

export default new Users();

/* eslint-disable */
import http from '../http-common';

class Projects {
  get(id, token) {
    return http.get(`/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  create(data, token) {
    return http.post('/projects', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  update(id, data, token) {
    return http.put(`/projects/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new Projects();

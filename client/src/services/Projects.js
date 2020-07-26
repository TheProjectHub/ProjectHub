import http from '../http-common';

class Projects {
  get(id) {
    return http.get(`/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  create(data) {
    return http.post('/projects', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  update(id, data) {
    return http.put(`/projects/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new Projects();

import http from '../http-common';

class Conversations {
  get(id) {
    return http.get(`/conversations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  create(data) {
    return http.post('/conversations', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  update(id, data) {
    return http.put(`/conversations/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new Conversations();

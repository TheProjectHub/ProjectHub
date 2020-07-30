/* eslint-disable */
import http from '../http-common';

class Conversations {
  get(id, token) {
    return http.get(`/conversations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  create(data, token) {
    return http.post('/conversations', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  update(id, data, token) {
    return http.put(`/conversations/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new Conversations();

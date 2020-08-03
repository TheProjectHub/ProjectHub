import http from '../http-common';

export function getConversation(id, token) {
  return http.get(`/conversations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function createConversation(data, token) {
  return http.post('/conversations', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateConversation(id, data, token) {
  return http.put(`/conversations/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

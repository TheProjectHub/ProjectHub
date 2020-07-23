import http from "../http-common";

class Conversations {
  get(id) {
    return http.get(`/conversations/${id}`);
  }

  create(data) {
    return http.post("/conversations", data);
  }

  update(id, data) {
    return http.put(`/conversations/${id}`, data);
  }
}

export default new Conversations();

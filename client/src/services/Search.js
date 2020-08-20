import http from "../http-common";

export function search(keyword, tags, limit = 50) {
  return http.post(`/search`, { keyword, tags, limit });
}

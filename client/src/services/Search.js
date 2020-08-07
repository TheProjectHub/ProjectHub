import http from "../http-common";

export function search(keyword, tags, limit = 50) {
  return http.get(`/search`, { keyword, tags, limit });
}

import http from "../http-common";

export function searchProjectByKeywordTags(keyword, tags, limit = 50) {
  return http.get(`/searchProjectByKeywordTags`, { keyword, tags, limit });
}

export function searchProjectByKeyword(keyword, tags, limit = 50) {
  return http.get(`/searchProjectByKeyword`, { keyword, tags, limit });
}

export function searchProjectByTags(keyword, tags, limit = 50) {
  return http.get(`/searchProjectByTags`, { keyword, tags, limit });
}

import http from "../http-common";

export function searchProjectByKeywordTags(data) {
  return http.get(`/search/searchProjectByKeywordTags`, data);
}

export function searchProjectByKeyword(data) {
  return http.get(`/search/searchProjectByKeyword`, data);
}

export function searchProjectByTags(data) {
  return http.get(`/search/searchProjectByTags`, data);
}

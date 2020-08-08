import http from "../http-common";

export function searchProjectByKeywordTags(keyword, tags, limit = 50) {
  return http.get(`/search/searchProjectByKeywordTags`, {
    keyword,
    tags,
    limit
  });
}

export function searchProjectByKeyword(keyword, tags, limit = 50) {
  return http.get(`/search/searchProjectByKeyword`, { keyword, tags, limit });
}

export function searchProjectByTags(keyword, tags, limit = 50) {
  return http.get(`/search/searchProjectByTags`, { keyword, tags, limit });
}

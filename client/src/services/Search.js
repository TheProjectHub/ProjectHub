import http from "../http-common";

export function searchProjectByKeywordTags(keyword, tags, limit = 10) {
  let params = {
    keyword: keyword,
    tags: tags,
    limit: limit
  };

  return http.get(`/search/searchProjectByKeywordTags`, { params });
}

export function searchProjectByKeyword(keyword, limit = 10) {
  let params = {
    keyword: keyword,
    limit: limit
  };

  return http.get(`/search/searchProjectByKeyword`, { params });
}

export function searchProjectByTags(tags, limit = 10) {
  let params = {
    tags: tags,
    limit: limit
  };

  return http.get(`/search/searchProjectByTags`, { params });
}

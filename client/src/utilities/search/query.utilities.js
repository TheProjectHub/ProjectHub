export function formQuery(keyword, tags, limit = 10) {
  return {
    keyword: keyword,
    tags: tags,
    limit: limit
  };
}

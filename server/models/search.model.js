const sql = require("./db");

// Query constructor
const Query = searchObject => {
  this.keyword = searchObject.keyword;
  this.tags = searchObject.tags;
  this.limit = searchObject.limit;
};

Query.searchProjectByKeywordTags = (query, res) => {};

Query.searchProjectByKeyword = (query, res) => {
  sql.query(
    "SELECT id FROM projects WHERE MATCH (name,description,search_filters) AGAINST (? IN NATURAL LANGUAGE MODE) AND looking_for_new_members = 1 LIMIT ?",
    [query.keyword, query.limit],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      console.log('search query complete ${res}')
      result(null, res);
  });
};

Query.searchProjectByTags = (query, res) => {};

module.exports = Query;
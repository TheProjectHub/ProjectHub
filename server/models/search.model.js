const sql = require("./db");

// Query constructor
const Query = function (searchObject) {
  this.keyword = searchObject.keyword;
  this.tags = searchObject.tags;
  this.limit = searchObject.limit;
};

Query.searchProjectByKeywordTags = (query, result) => {};

Query.searchProjectByKeyword = (query, result) => {
  sql.query(
    "SELECT id, MATCH (name,description,search_filters) AGAINST (? IN NATURAL LANGUAGE MODE) AS score FROM projects WHERE MATCH (name,description,search_filters) AGAINST (? IN NATURAL LANGUAGE MODE) > 0 AND looking_for_new_members = 1 ORDER BY score DESC LIMIT ?",
    [query.keyword, query.keyword, query.limit],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      var data = JSON.parse(JSON.stringify(res)).map(p => p.id);
      console.log("search query complete for\n", query, "\nwith project\n", data);
      result(null, data);
    }
  );
};

Query.searchProjectByTags = (query, result) => {};

module.exports = Query;

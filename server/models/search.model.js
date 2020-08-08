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
    "SELECT id FROM projects WHERE MATCH (name,description,search_filters) AGAINST (? IN NATURAL LANGUAGE MODE) AND looking_for_new_members = 1 LIMIT ?",
    [query.keyword, query.limit],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("search query complete for\n", query, "\nwith result\n", res);
      result(null, res);
    }
  );
};

Query.searchProjectByTags = (query, result) => {};

module.exports = Query;

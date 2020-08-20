const sql = require("./db");

// Query constructor
const Query = function (searchObject) {
  this.keyword = searchObject.keyword;
  this.tags = searchObject.tags;
  this.limit = searchObject.limit;
};

Query.searchProjectByKeywordTags = (query, result) => {
  sql.query(
    "SELECT p.id\
    FROM (\
        SELECT id, MATCH (name,description,search_filters) AGAINST (? IN NATURAL LANGUAGE MODE) AS score\
        FROM projects\
        WHERE MATCH (name,description,search_filters) AGAINST (? IN NATURAL LANGUAGE MODE) > 0\
        AND looking_for_new_members = 1\
        ORDER BY score DESC\
        LIMIT ?\
      ) as p,\
      tagging as t\
    WHERE p.id = t.project_id\
    AND (t.tag in ( ? ))\
    GROUP BY p.id\
    HAVING count(*) = ?;",
    [query.keyword, query.keyword, query.limit, query.tags, query.tags.length],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      var data = JSON.parse(JSON.stringify(res)).map(p => p.id);
      console.log(
        "searchProjectByKeywordTags - search query complete for\n",
        query,
        "\nwith projects\n",
        data
      );
      result(null, data);
    }
  );
};

Query.searchProjectByKeyword = (query, result) => {
  sql.query(
    "SELECT id, MATCH (name,description,search_filters) AGAINST (? IN NATURAL LANGUAGE MODE) AS score\
    FROM projects\
    WHERE MATCH (name,description,search_filters) AGAINST (? IN NATURAL LANGUAGE MODE) > 0\
    AND looking_for_new_members = 1\
    ORDER BY score\
    DESC LIMIT ?",
    [query.keyword, query.keyword, query.limit],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      var data = JSON.parse(JSON.stringify(res)).map(p => p.id);
      console.log(
        "searchProjectByKeyword - search query complete for\n",
        query,
        "\nwith projects\n",
        data
      );
      result(null, data);
    }
  );
};

Query.searchProjectByTags = (query, result) => {
  sql.query(
    `SELECT p.id\
    FROM projects as p, tagging as t\
    WHERE p.id = t.project_id\
    AND (t.tag in ( ? ))\
    GROUP BY p.id\
    HAVING count(*) = ?;`,
    [query.tags, query.tags.length],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      var data = JSON.parse(JSON.stringify(res)).map(p => p.id);
      console.log(
        "searchProjectByTags - search query complete for\n",
        query,
        "\nwith projects\n",
        data
      );
      result(null, data);
    }
  );
};

module.exports = Query;

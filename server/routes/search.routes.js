module.exports = app => {
  const search = require("../controllers/search.controller");

  // search project by keyword and tags
  app.get("/search/searchProjectByKeywordTags", search.searchProjectByKeywordTags);

  // search project by keyword
  app.get("/search/searchProjectByKeyword", search.searchProjectByKeyword);

  // search project by tags
  app.get("/search/searchProjectByTags", search.searchProjectByTags);
};

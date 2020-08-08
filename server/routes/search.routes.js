module.exports = app => {
  const search = require("../controllers/search.controller");

  // search project by keyword and tags
  app.get("/searchKeywordTags", search.searchByKeywordTags);

  // search project by keyword
  app.get("/searchKeyword", search.searchKeyword);

  // search project by tags
  app.get("/searchTags", search.searchTags);
};

const Query = require("../models/search.model");

const formQuery = obj => {
  return new Query({
    keyword: obj.keyword,
    tags: obj.tags ? JSON.parse(obj.tags) : obj.tags,
    limit: obj.limit ? JSON.parse(obj.limit) : obj.limit
  });
};

exports.searchProjectByKeywordTags = (req, res) => {
  // validate request
  if (!req.query) {
    res.status(400).send({
      message: "Query can't be empty, bitch!"
    });
  }

  // create query
  let query = formQuery(req.query);

  // search by keyword and tags
  Query.searchProjectByKeywordTags(query, (err, data) => {
    if (err)
      res.status(500).send({
        message: `Error creating search with keyword: ${query.keyword} and tags: ${query.tags}`
      });
    else res.send(data);
  });
};

exports.searchProjectByKeyword = (req, res) => {
  // validate request
  if (!req.query) {
    res.status(400).send({
      message: "Query can't be empty, bitch!"
    });
  }

  // create query
  let query = formQuery(req.query);

  // search by keyword
  Query.searchProjectByKeyword(query, (err, data) => {
    if (err)
      res.status(500).send({
        message: `Error creating search with keyword: ${query.keyword}`
      });
    else res.send(data);
  });
};

exports.searchProjectByTags = (req, res) => {
  // validate request
  if (!req.query) {
    res.status(400).send({
      message: "Query can't be empty, bitch!"
    });
  }

  // create query
  let query = formQuery(req.query);

  // search by tags
  Query.searchProjectByTags(query, (err, data) => {
    if (err)
      res.status(500).send({
        message: `Error creating search with tags: ${query.tags}`
      });
    else res.send(data);
  });
};

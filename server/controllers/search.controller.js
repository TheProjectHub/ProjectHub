const Query = require('../models/search.model');

const formQuery = (obj) => {
  return new Query({
    keyword: body.keyword,
    tags: body.tags,
    limit: body.limit
  });
}

exports.searchProjectByKeywordTags = (req, res) => {
    // validate request
    if (!req.body) {
      res.status(400).send({
        message: 'Content can\'t be empty, bitch!',
      });
    }

    // create query
    let query = formQuery(req.body);

    // search by keyword and tags
    Query.searchProjectByKeywordTags(query, (err, data) => {
      if (err)
        res.status(500).send({
          message: `Error creating search with keyword: ${query.keyword} and tags: ${query.tags}`
        });
      else res.send(data);
    });
}

exports.searchProjectByKeyword = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can\'t be empty, bitch!',
    });
  }

  console.log(req.body);

  // create query
  let query = formQuery(req.body);

  // search by keyword
  Query.searchProjectByKeyword(query, (err, data) => {
    if (err)
      res.status(500).send({
        message: `Error creating search with keyword: ${query.keyword}`
      });
    else res.send(data);
  });
}

exports.searchProjectByTags = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can\'t be empty, bitch!',
    });
  }

  // create query
  let query = formQuery(req.body);

  // search by tags
  Query.searchProjectByTags(query, (err, data) => {
    if (err)
      res.status(500).send({
        message: `Error creating search with tags: ${query.tags}`
      });
    else res.send(data);
  });
}

const User = require('../models/user.model');

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a user
  var user = new User({
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    project_affiliation: req.body.project_affiliation,
    email: req.body.email,
    password_hash: req.body.password_hash,
    search_filters: req.body.search_filters,
    looking_for_project: req.body.looking_for_project,
    skills: req.body.skills,
    bio: req.body.bio,
    conversations: req.body.conversations,
    unread_conversations: req.body.unread_conversations,
    age: req.body.age,
    location: req.body.location,
  });

  // Save user in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    else res.send(data);
  });
};

// Find a single user with a userId
exports.getUser = (req, res) => {
  if (req.params.identifier.includes('@')) {
    User.findByEmail(req.params.identifier, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found User with email ${req.params.identifier}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error retrieving User with email ' + req.params.identifier,
          });
        }
      } else res.send(data);
    });
  } else {
    User.findById(req.params.identifier, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found User with id ${req.params.identifier}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error retrieving User with id ' + req.params.identifier,
          });
        }
      } else res.send(data);
    });
  }
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating User with id ' + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

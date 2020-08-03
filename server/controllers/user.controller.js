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
    search_filters: req.body.search_filters,
    looking_for_project: req.body.looking_for_project,
    skills: req.body.skills,
    bio: req.body.bio,
    conversations: req.body.conversations,
    unread_conversations: req.body.unread_conversations,
    age: req.body.age,
    location: req.body.location,
    requested_conversations: req.body.requested_conversations,
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
  // if a email is passed in the request
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

  // if an id is passed in the request
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

  // Update user in database
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

// Add a conversation id to a user's requested_conversations arr
exports.inviteToConversation = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Update user with new requested conversation
  User.inviteToConversation(req.body.email, req.body.convId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No found User with email ${req.body.email}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating User with id ' + req.body.id,
        });
      }
    } else res.send(data);
  });
};

// Remove a conversation id from a user's requested_conversations arr
exports.rejectConversationRequest = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Updated user without requested conversation
  User.rejectConversationRequest(
    req.body.id,
    req.body.convId,
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `No found User with id ${req.body.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error updating User with id ' + req.body.id,
          });
        }
      } else res.send(data);
    },
  );
};

// Add a conversation id to a user's conversations arr
exports.addConversationToUser = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Update user with new conversation id
  User.addConversationToUser(req.body.id, req.body.convId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No found User with id ${req.body.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating User with id ' + req.body.id,
        });
      }
    } else res.send(data);
  });
};

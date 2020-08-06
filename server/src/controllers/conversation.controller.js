const Conversation = require('../models/conversation.model');

// Create and save a new conversation
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a conversation
  var conversation = new Conversation({
    id: req.body.id,
    users: req.body.users,
    messages: req.body.messages,
    name: req.body.name,
  });

  // Save conversation in the database
  Conversation.create(conversation, (err, data) => {
    if (err)
      res.status(500).send({
        message: `Error creating conversation with values: ${Object.values(
          conversation,
        )}`,
      });
    else res.send(data);
  });
};

// Find a single conversation with a conversationId
exports.getConversationByID = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Find conversation in database
  Conversation.findById(req.params.conversationId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Conversation with id ${req.params.conversationId}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Error retrieving Conversation with id ' +
            req.params.conversationId,
        });
      }
    } else res.send(data);
  });
};

// Update a conversation identified by the conversationId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Conversation.updateById(
    req.params.conversationId,
    new Conversation(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Conversation with id ${req.params.conversationId}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error updating Conversation with id ' +
              req.params.conversationId,
          });
        }
      } else res.send(data);
    },
  );
};

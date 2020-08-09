module.exports = (app) => {
  const conversations = require('../controllers/conversation.controller');
  const auth = require('./auth');

  // Create a new conversation
  app.post('/conversations', auth.checkJwt, conversations.create);

  // Retrieve a single conversation with conversationsId
  app.get(
    '/conversations/:conversationId',
    auth.checkJwt,
    conversations.getConversationByID,
  );

  // Update a conversation with conversationsId
  app.put(
    '/conversations/:conversationId',
    auth.checkJwt,
    conversations.update,
  );
};

module.exports = (app) => {
  const conversations = require("../controllers/conversation.controller");
  
  // Create a new conversation
  app.post("/conversations", conversations.create);
  
  // Retrieve a single conversation with conversationsId
  app.get("/conversations/:conversationId", conversations.getConversationByID);
  
  // Update a conversation with conversationsId
  app.put("/conversations/:conversationId", conversations.update);
};
  
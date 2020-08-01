var users = {};
const Conversation = require('../models/conversation.model');

module.exports = (server) => {
  const io = require('socket.io')(server);
  
  io.on('connection', function (socket) {
    socket.on('initalConnection', (conversations) => {
      addUser(socket.id, conversations);
    });
    socket.on('sendMessage', (data) => {
      // update conversation object with new message
      Conversation.findById(data.conversationId, (err, res) => {
        updatedConversation = res;

        // convert messages arr to JSON string representation
        var messages = JSON.parse(updatedConversation.messages);
        messages.push(data.message);
        messages = JSON.stringify(messages);
        updatedConversation.messages = messages;

        Conversation.updateById(
          data.conversationId,
          updatedConversation,
          (err, updateMessage) => {
            if (err) throw err;
          }
        );
      });

      notifyClientsAboutNewMessage(io, data.conversationId);
    });
    socket.on('disconnect', () => {
      removeUser(socket.id);
    });
  });
};

function notifyClientsAboutNewMessage(io, conversationId) {
  if (!users) {
    return
  }
  for (const [socketId, conversations] of Object.entries(users)) {
    if (conversations.includes(conversationId)) {
      io.to(socketId).emit('newMessage', conversationId);
    }
  }
}

function addUser(socketId, conversations) {
  users[socketId] = conversations;
}

function removeUser(socketId) {
  delete users[socketId];
}

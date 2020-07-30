module.exports = (server) => {
  const Conversation = require('../models/conversation.model');

  const io = require('socket.io')(server);

  var m = {
    userId: 1,
    text: 'lmao',
    timeStamp: new Date(),
  };

  io.on('connection', function (socket) {
    socket.on('SEND_MESSAGE', (data) => {
      // update conversation object with new message
      Conversation.findById(data.conversationId, (err, res) => {
        updatedConversation = res;
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

      // broadcast to all currently connected sockets that there has been
      // a new message to the conversation id thats passed
      io.emit('broadcast', data.conversationId);
    });
  });
};

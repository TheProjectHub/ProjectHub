module.exports = (app) => {
  const users = require('../controllers/user.controller');
  const auth = require('./auth');

  // Create a new user
  app.post('/users', auth.checkJwt, users.create);

  // Invite user to new conversation
  app.post(
    '/users/invitetoconversation',
    auth.checkJwt,
    users.inviteToConversation,
  );

  // Reject conversation invite
  app.post(
    '/users/rejectconversationrequest',
    auth.checkJwt,
    users.rejectConversationRequest,
  );

  // Add conversation to user's conversation list
  app.post(
    '/users/addconversationtouser',
    auth.checkJwt,
    users.addConversationToUser,
  );

  // Invite user to new project
  app.post(
    '/users/invitetoproject',
    auth.checkJwt,
    users.inviteToProject,
  );

  // Reject project invite
  app.post(
    '/users/rejectprojectrequest',
    auth.checkJwt,
    users.rejectProjectRequest,
  );

  // Add project to user's project list
  app.post(
    '/users/addprojecttouser',
    auth.checkJwt,
    users.addProjectToUser,
  );

  // Retrieve a single user with userId
  app.get('/users/:identifier', auth.checkJwt, users.getUser);

  // Update a user with userId
  app.put('/users/:userId', auth.checkJwt, users.update);
};

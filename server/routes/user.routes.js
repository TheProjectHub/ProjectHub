module.exports = (app) => {
  const users = require('../controllers/user.controller');
  const auth = require('./auth');

  // Create a new user
  app.post('/users', auth.checkJwt, users.create);

  // Retrieve a single user with userId
  app.get('/users/:identifier', auth.checkJwt, users.getUser);

  // Update a user with userId
  app.put('/users/:userId', auth.checkJwt, users.update);
};

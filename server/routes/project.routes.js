module.exports = (app) => {
  const projects = require('../controllers/project.controller');
  const auth = require('./auth');

  // Create a new project
  app.post('/projects', auth.checkJwt, projects.create);

  // Retrieve a single project with projectId
  app.get('/projects/:projectId', auth.checkJwt, projects.getProjectByID);

  // Update a project with projectId
  app.put('/projects/:projectId', auth.checkJwt, projects.update);
};

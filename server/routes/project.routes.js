module.exports = (app) => {
<<<<<<< HEAD
  const projects = require('../controllers/project.controller');
  const auth = require('./auth');

  // Create a new project
  app.post('/projects', auth.checkJwt, projects.create);

  // Retrieve a single project with projectId
  app.get('/projects/:projectId', auth.checkJwt, projects.getProjectByID);

  // Update a project with projectId
  app.put('/projects/:projectId', auth.checkJwt, projects.update);
};
=======
  const projects = require("../controllers/project.controller");
  
  // Create a new project
  app.post("/projects", projects.create);
  
  // Retrieve a single project with projectId
  app.get("/projects/:projectId", projects.getProjectByID);
  
  // Update a project with projectId
  app.put("/projects/:projectId", projects.update);
};
  
>>>>>>> b98bb5ddfd183940f8ff80bfe9991f8719e4198c

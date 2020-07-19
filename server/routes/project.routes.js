module.exports = (app) => {
  const projects = require("../controllers/project.controller");
  
  // Create a new project
  app.post("/projects", projects.create);
  
  // Retrieve a single project with projectId
  app.get("/projects/:projectId", projects.getProjectByID);
  
  // Update a project with projectId
  app.put("/projects/:projectId", projects.update);
};
  
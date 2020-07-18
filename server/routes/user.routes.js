module.exports = (app) => {
  const users = require("../controllers/user.controller");

  // Create a new user
  app.post("/users", users.create);

  // Retrieve a single user with userId
  app.get("/users/:userId", users.getUserByID);

  // Update a user with userId
  app.put("/users/:userId", users.update);
};

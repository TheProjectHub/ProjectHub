const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Projectly." });
});

// Conversation routes
require("./server/routes/conversation.routes")(app);

// Project routes
require("./server/routes/project.routes")(app);

// User routes
require("./server/routes/user.routes")(app);

// Search routes
require("./server/routes/search.routes")(app);

// serve frontend
app.use(serveStatic(path.join(__dirname, "dist")));

// set port, listen for requests
const port = process.env.PORT || 3000;
const server = app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

// WebSocketing for messaging interface
require("./server/messaging/messaging")(server);

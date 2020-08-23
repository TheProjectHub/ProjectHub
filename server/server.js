const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:8080'],
    credentials: true,
  })
);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Projectly.' });
});

// Conversation routes
require('./routes/conversation.routes')(app);

// Project routes
require('./routes/project.routes')(app);

// User routes
require('./routes/user.routes')(app);

// Search routes
require('./routes/search.routes')(app);

// set port, listen for requests
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});

// WebSocketing for messaging interface
require('./messaging/messaging')(server)

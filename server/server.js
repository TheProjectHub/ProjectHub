const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// cors
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // update to match the domain you will make the request from
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Credentials'
//   );
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

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

// set port, listen for requests
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});

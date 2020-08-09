const Project = require('../models/project.model');

// Create and Save a new project
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a project
  var project = new Project({
    id: req.body.id,
    members: req.body.members,
    description: req.body.description,
    name: req.body.name,
    links: req.body.links,
    looking_for_new_members: req.body.looking_for_new_members,
    search_filters: req.body.search_filters,
    applicants: req.body.applicants,
  });

  // Save project in the database
  Project.create(project, (err, data) => {
    if (err)
      res.status(500).send({
        message: `Error creating project with values: ${Object.values(
          project,
        )}`,
      });
    else res.send(data);
  });
};

// Find a single project with a projectId
exports.getProjectByID = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Project.findById(req.params.projectId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Project with id ${req.params.projectId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Project with id ' + req.params.projectId,
        });
      }
    } else res.send(data);
  });
};

exports.getNames = (req, res) => {
  Project.getAllNames((err, data) => {
    if (err) {
      res.status(500).send({
        message: 'Error retrieving project names.',
      });
    } else res.send(data);
  });
};

// Update a project identified by the projectId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Project.updateById(
    req.params.projectId,
    new Project(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Project with id ${req.params.projectId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error updating Project with id ' + req.params.projectId,
          });
        }
      } else res.send(data);
    },
  );
};

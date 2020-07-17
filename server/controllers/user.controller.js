const User = require("../models/user.model");

// Create and Save a new Customer
exports.create = (req, res) => {
  
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Customer with a customerId
exports.getUserByID = (id, res) => {
    User.findById(id, (err, data) => {
        if (err) {
            throw err;
        } else res = data;
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  
};
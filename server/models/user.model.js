const sql = require("./database");

// constructor
const User = function(user) {
  this.email = user.email;
  this.name = user.name;
  this.active = user.active;
  this.first_name = user.first_name;
};

User.findById = (customerId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
        result(null, res[0]);
        return;
    }
  });
};

module.exports = User;
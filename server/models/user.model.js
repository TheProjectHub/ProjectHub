const sql = require("./db");

// constructor
const User = function (user) {
  this.id = user.id;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.project_affiliation = user.project_affiliation;
  this.email = user.email;
  this.password_hash = user.password_hash;
  this.search_filters = user.search_filters;
  this.looking_for_project = user.looking_for_project;
  this.skills = user.skills;
  this.bio = user.bio;
  this.conversations = user.conversations;
  this.unread_conversations = user.unread_conversations;
  this.age = user.age;
  this.location = user.location;
};

User.create = (user, result) => {
  sql.query("INSERT INTO users SET ?", user, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...user });
    result(null, { id: res.insertId, ...user });
  });
};

User.findById = (userID, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET \
    first_name = ?, last_name = ?, project_affiliation = ?, email = ?, password_hash = ?, \
    search_filters = ?, looking_for_project = ?, skills = ?, bio = ?, conversations = ?, \
    unread_conversations = ?, age = ?, location = ?\
    WHERE id = ?",
    [
      user.first_name,
      user.last_name,
      user.project_affiliation,
      user.email,
      user.password_hash,
      user.search_filters,
      user.looking_for_project,
      user.skills,
      user.bio,
      user.conversations,
      user.unread_conversations,
      user.age,
      user.location,
      user.id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

module.exports = User;
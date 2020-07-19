const sql = require("./db");

// constructor
const Project = function (project) {
  this.id = project.id;
  this.members = project.members;
  this.name = project.name;
  this.links = project.links;
  this.looking_for_new_members = project.looking_for_new_members;
  this.search_filters = project.search_filters;
  this.applicants = project.applicants;
};

Project.create = (project, result) => {
  sql.query("INSERT INTO projects SET ?", project, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created projects: ", { id: res.insertId, ...project });
    result(null, { id: res.insertId, ...project });
  });
};

Project.findById = (projectID, result) => {
  sql.query(`SELECT * FROM projects WHERE id = ${projectID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // could not find Project with the id
    result({ kind: "not_found" }, null);
  });
};

Project.updateById = (id, project, result) => {
  sql.query(
    "UPDATE projects SET \
    members = ?, name = ?, links = ?, looking_for_new_members = ?, search_filters = ?, \
    applicants = ?\
    WHERE id = ?",
    [
      project.members,
      project.name,
      project.links,
      project.looking_for_new_members,
      project.search_filters,
      project.applicants,
      id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // could not find projects with the id provided
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated projects: ", { id: id, ...project });
      result(null, { id: id, ...project });
    }
  );
};

module.exports = Project;

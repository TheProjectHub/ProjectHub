const sql = require("./db");

// constructor
const User = function (user) {
  this.id = user.id;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.search_filters = user.search_filters;
  this.looking_for_project = user.looking_for_project;
  this.skills = user.skills;
  this.bio = user.bio;
  this.conversations = user.conversations;
  this.unread_conversations = user.unread_conversations;
  this.age = user.age;
  this.location = user.location;
  this.requested_conversations = user.requested_conversations;
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

User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = \'${email}\'`, (err, res) => {
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

User.updateById = (userID, user, result) => {
  sql.query(
    "UPDATE users SET \
    first_name = ?, last_name = ?, project_affiliation = ?, email = ?, \
    search_filters = ?, looking_for_project = ?, skills = ?, bio = ?, conversations = ?, \
    unread_conversations = ?, age = ?, location = ?, requested_conversations = ?\
    WHERE id = ?",
    [
      user.first_name,
      user.last_name,
      user.project_affiliation,
      user.email,
      user.search_filters,
      user.looking_for_project,
      user.skills,
      user.bio,
      user.conversations,
      user.unread_conversations,
      user.age,
      user.location,
      user.requested_conversations,
      userID
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // could not find user with the id provided
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: userID, ...user });
      result(null, { id: userID, ...user });
    }
  );
};

User.inviteToConversation = (email, convId, result) => {
  sql.query(
    `select requested_conversations from users where email = \'${email}\'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length) {
        let reqConvos = JSON.parse(res[0].requested_conversations);

        // if inviting user to a conversation they are already a part of
        if (reqConvos.includes(convId)) {
          result(null, email);
          return;
        }
        reqConvos.push(convId);
        sql.query(
          "update users set requested_conversations = ? where email = ?",
          [JSON.stringify(reqConvos), email],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }

            console.log("updated user: ", email);
            result(null, res[0]);
          }
        );
      } else {
        result({ kind: "not_found" }, null);
      }
    }
  );
};

User.addConversationToUser = (userID, convId, result) => {
  // update conv object to include userId as member
  sql.query(
    `select users from conversations where id = ${convId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.length) {
        users = JSON.parse(res[0].users);
        if (!users.includes(userID)) users.push(userID);

        sql.query(
          `update conversations set users = \'${JSON.stringify(
            users
          )}\' where id = ${convId}`,
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
          }
        );
      } else {
        result(
          {
            kind: "not_found"
          },
          null
        );
      }
    }
  );
  // update user object to include new convId
  sql.query(
    `select conversations, requested_conversations from users where id = \'${userID}\'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length) {
        let convos = JSON.parse(res[0].conversations);
        let reqConvos = JSON.parse(res[0].requested_conversations);

        // find and remove conversation from requested_conversations
        for (var i = 0; i < reqConvos.length; i++) {
          if (reqConvos[i] == convId) {
            reqConvos.splice(i, 1);
            break;
          }
        }
        convos.push(convId);

        sql.query(
          `update users set conversations = ?, requested_conversations = ? where id = ${userID}`,
          [JSON.stringify(convos), JSON.stringify(reqConvos)],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }

            console.log("updated user: ", userID);
            result(null, res[0]);
          }
        );
      } else {
        result(
          {
            kind: "not_found"
          },
          null
        );
      }
    }
  );
};

User.rejectConversationRequest = (userID, convId, result) => {
  // remove conversation request from invitee
  sql.query(
    `select requested_conversations from users where id = ${userID}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length) {
        let reqConvos = JSON.parse(res[0].requested_conversations);

        // find and remove conversation from requested_conversations
        for (var i = 0; i < reqConvos.length; i++) {
          if (reqConvos[i] == convId) {
            reqConvos.splice(i, 1);
            break;
          }
        }
        sql.query(
          "update users set requested_conversations = ? where id = ?",
          [JSON.stringify(reqConvos), userID],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }

            console.log("updated user: ", userID);
            result(null, res[0]);
          }
        );
      } else {
        result({ kind: "not_found" }, null);
      }
    }
  );
  // remove conversation from inviter and delete conversation if dm
  sql.query(
    `select conversations, id from users where conversations like \'%${convId}%\'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.length) {
        const conversations = JSON.parse(res[0].conversations);

        conversations.splice(conversations.indexOf(convId), 1);

        sql.query(
          "update users set conversations = ? where id = ?",
          [JSON.stringify(conversations), res[0].id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            console.log("updated user: ", userID);
          }
        );
        sql.query(`select name from conversations where id = ${convId}`, (err, res) => {
          if (res[0].name == "DM") sql.query(`delete from conversations where id = ${convId}`, (err, res));
        })
      } else {
        result({ kind: "not_found" }, null);
      }
    }
  );
};

module.exports = User;

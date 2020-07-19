const sql = require("./db");

// constructor
const Conversation = function (conversation) {
  this.id = conversation.id;
  this.users = conversation.users;
  this.messages = conversation.messages;
  this.name = conversation.name;
};

Conversation.create = (conversation, result) => {
  sql.query("INSERT INTO conversations SET ?", conversation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created conversations: ", { id: res.insertId, ...conversation });
    result(null, { id: res.insertId, ...conversation });
  });
};

Conversation.findById = (conversationID, result) => {
  sql.query(`SELECT * FROM conversations WHERE id = ${conversationID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // could not fiund Conversation with the id
    result({ kind: "not_found" }, null);
  });
};

Conversation.updateById = (id, conversation, result) => {
  sql.query(
    "UPDATE conversations SET \
    users = ?, messages = ?, name = ?, email = ?, password_hash = ?, \
    WHERE id = ?",
    [
      conversation.users,
      conversation.messages,
      conversation.name,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // could not find conversation with the id provided
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated conversations: ", { id: id, ...conversation });
      result(null, { id: id, ...conversation });
    }
  );
};

module.exports = Conversation;

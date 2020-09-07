const assert = require("assert");
var random_name = require("node-random-name");

const User = require("../src/models/user.model");

describe("User Model Test", () => {
  const name = random_name().split(" ");
  const search_filters = ["Vue.js", "Music", "College"];
  const skills = ["web development", "social media", "big data"];
  const user = {
    first_name: name[0],
    last_name: name[1],
    email: (name.join("") + "@gmail.com").toLowerCase(),
    search_filters: JSON.stringify(search_filters),
    looking_for_project: 1,
    skills: JSON.stringify(skills),
    bio: "I can't think of a bio",
    conversations: JSON.stringify([1, 2, 3]),
    unread_conversations: JSON.stringify([2, 3]),
    age: 21,
    location: "College Station, TX",
    requested_conversations: JSON.stringify([4, 5])
  };

  it("should create and find a user by id", async () => {
    User.create(user, (err, newUser) => {
      User.findById(newUser.id, (err, res) => {
        console.log("newUserID:", newUser.id);
        console.log("user age", user.age, "res age", res.age);
        assert.equal(res.age, user.age);
        assert.deepEqual(JSON.parse(res.search_filters), search_filters);
        assert.deepEqual(JSON.parse(res.skills), skills);
        assert.deepEqual(
          JSON.parse(res.conversations),
          JSON.parse(user.conversations)
        );
      });
    });
  });
  it("should find a user by email", async () => {
    User.findByEmail(user.email, (err, res) => {
      assert.equal(res.first_name, user.first_name);
    });
  });
  it("should update a user by id", async () => {
    const randomAge = Math.floor(Math.random() * 100) + 1;
    console.log("randomAge", randomAge);
    let newUser = user;
    newUser.age = randomAge;
    User.updateById(1, newUser, (err, res) => assert.notEqual(res, null));
    User.findById(1, (err, res) => {
      assert.equal(randomAge, res.age);
      assert.equal(newUser.first_name, res.first_name);
    });
  });
});

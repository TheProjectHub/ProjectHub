const assert = require("assert");
var random_name = require("node-random-name");

const User = require("../src/models/user.model");

describe("User Model Test", () => {
  it("should create a user", async () => {
    const name = random_name().split(" ");
    search_filters = ["Vue.js", "Music", "College"];
    skills = ["web development", "social media", "big data"];
    const user = User({
      first_name: name[0],
      last_name: name[1],
      email: (name.join() + "@gmail.com").toLowerCase(),
      search_filters: JSON.stringify(search_filters),
      looking_for_project: 1,
      skills: JSON.stringify(skills),
      bio: "I can't think of a bio",
      conversations: JSON.stringify([1, 2, 3]),
      unread_conversations: JSON.stringify([2, 3]),
      age: 21,
      location: "College Station, TX",
      requested_conversations: JSON.stringify([4, 5])
    });

    let userId;
    User.create(user, (err, res) => {
      userId = res.id;
    });
    let expectedUser;
    User.findById(userId, (err, res) => (expectedUser = res));
    assert.equal(user, expectedUser);
  });
});

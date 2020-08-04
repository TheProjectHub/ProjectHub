<template>
<html>
  <h1>Let's get started!</h1>
  <div class="container">
    <form>
      <input type="text" placeholder="Enter First Name" v-model="firstn" id="a" required />

      <input type="text" placeholder="Enter Last Name" v-model="lastn" id="a" required />

      <input type="text" placeholder="Enter Email" v-model="mail" id="b" required />
      <br />
      <input type="text" placeholder="Enter Age" v-model="age" id="c" required />

      <input type="text" placeholder="Location" v-model="location" id="d" required />
      <br />
      <input type="text" placeholder="bio" v-model="bio" id="d" required />
      <br />
      <button @click="addSkill" type="button" class="btn btn-info">Add skill</button>
      <div v-for="(skill, index) in skills" :key="index">{{ skill }}</div>
      <br />
      <br />
      <input id="e" class="button is-primary margin-bottom: 2vh;" type="submit" @click="createUser" />
    </form>
  </div>
</html>
</template>

<script>
import { createUser } from "../services/Users";

export default {
  name: "Signup",
  data() {
    return {
      first_name: this.$auth.user.given_name,
      last_name: this.$auth.user.family_name,
      email: this.$auth.user.email,
      skill: "",
      skills: [],
      bio: "",
      age: "",
      location: ""
    };
  },
  methods: {
    async createUser() {
      const accessToken = await this.$auth.getTokenSilently();
      const user = {
        first_name: this.first_name,
        last_name: this.last_name,
        project_affiliation: "[]",
        email: this.email,
        search_filters: "[]",
        looking_for_project: 1,
        skills: JSON.stringify(this.skills),
        bio: this.bio,
        conversations: "[]",
        unread_conversations: "[]",
        age: this.age,
        location: this.location
      };
      createUser(user, accessToken);
      this.$router.push("/");
    },
    addSkill() {
      this.skills.push(this.skill);
      this.skill = "";
    },
    displayUserOAuthData() {
      this.first_name = this.$auth.user.given_name;
      this.last_name = this.$auth.user.family_name;
      this.email = this.$auth.user.email;
    }
  },
  mounted() {
    const checkIsAuthLoaded = setInterval(() => {
      if (!this.$auth.loading) {
        this.displayUserOAuthData();
        clearInterval(checkIsAuthLoaded);
      }
    }, 100);
  }
};
</script>

<style scoped>
h1 {
  margin-top: 2%;
  color: white;
}
input[type="text"] {
  width: 40%;
  padding: 12px 20px;
  margin-top: 8px;
  margin-bottom: 8px;
  display: inline-block;
  border: none;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #d3d3d3;
}
input[id="a"] {
  width: 30%;
}

input[id="b"] {
  width: 50%;
}

input[id="c"] {
  width: 10%;
}

input[id="d"] {
  width: 30%;
}
input[id="e"] {
  width: 50%;
  background: rgb(48, 216, 48);
}
</style>

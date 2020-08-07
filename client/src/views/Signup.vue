<template>
  <html>
    <section id="new" class="main">
      <form>
        <h1 class="title is-1">
          Tell us about yourself!
        </h1>
        <div class="field">
          <label class="label">First Name:</label>
          <div class="control">
            <input class="input" type="text" v-model="first_name" />
          </div>
        </div>
        <div class="field">
          <label class="label">Last Name:</label>
          <div class="control">
            <input class="input" type="text" v-model="last_name" />
          </div>
        </div>
        <div class="field">
          <label class="label">Email:</label>
          <div class="control">
            <input class="input" type="text" v-model="email" disabled />
          </div>
        </div>
        <div class="field">
          <label class="label">Bio:</label>
          <div class="control">
            <input class="input" type="text" v-model="bio" />
          </div>
        </div>
        <div class="field">
          <label class="label">Age:</label>
          <div class="control">
            <input class="input" type="text" v-model="age" />
          </div>
        </div>
        <div class="field">
          <label class="label">Location:</label>
          <div class="control">
            <input class="input" type="text" v-model="location" />
          </div>
        </div>
        <div class="field">
          <label class="label">Skills:</label>
          <div class="control">
            <input class="input" type="text" v-model="skill" />
          </div>
          <button @click="addSkill" type="button" class="btn btn-info">
            Add skill
          </button>
          <div v-for="(skill, index) in skills" :key="index">{{ skill }}</div>
        </div>
        <input
          class="button is-primary margin-bottom: 2vh;"
          type="submit"
          @click="createUser"
        />
      </form>
    </section>
  </html>
</template>

<script>
import { createUser } from "../services/Users";

import { onceAuthIsLoaded } from "../utilities/auth/auth.utility";

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
    onceAuthIsLoaded(this.$auth, this.displayUserOAuthData);
  }
};
</script>

<style scoped>
p,
h2,
ul {
  color: white;
}
.row {
  max-width: 83vw;
  margin: auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
html {
  background: linear-gradient(-45deg, #b721ff, #23a6d5, #500000) fixed;
  background-size: 400% 400%;
  animation: gradient 45s ease infinite;
  height: 100vh;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>

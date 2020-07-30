<template>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </head>
  <body>
    <h2 style="text-align:center">{{this.user.first_name}}'s Card</h2>

    <div class="card">
      <img src="../assets/logo.png" alt="Vue logo" style="width:100%" />
      <h1>{{this.user.first_name}}</h1>
      <h1>{{this.user.last_name}}</h1>
      <h2>{{this.user.location}}</h2>
      <p class="title">{{this.user.bio}}</p>
      <ul v-for="skill in this.user.skills" :key="skill">{{skills}}</ul>
      <div style="margin: 24px 0;">
        <p v-if="!this.user.looking_for_project">Actively looking for projects!</p>
        <h2>Project affiliations</h2>
        <ul
          style="list-style: none"
          v-for="project in this.projects"
          :key="project"
        >{{project.name}}</ul>
      </div>
    </div>
  </body>
</html>
</template>

<script>
/* eslint-disable */
import User from "../services/Users";
import Projects from "../services/Projects";

export default {
  name: "Profile",
  data() {
    return {
      user: {},
      projects: [],
    };
  },
  methods: {
    async getUser(id) {
      // Get the access token from the auth wrapper
      const accessToken = await this.$auth.getTokenSilently();
      const newProjects = [];

      // Use the eventService to call the getEventSingle method
      User.get(id, accessToken).then((event) => {
        this.$set(this, "user", event.data);

        // Convert string representation of skills to array object
        const skills = event.data.skills;
        this.user.skills = skills.substring(1, skills.indexOf("]")).split(", ");

        // Convert string representation of project_affiliations to array object
        const project_affiliation = event.data.project_affiliation;
        this.user.project_affiliation = project_affiliation
          .substring(1, project_affiliation.indexOf("]"))
          .split(", ");

        // Loop through project affiliations and get objects by id
        for (
          let index = 0;
          index < this.user.project_affiliation.length;
          index += 1
        ) {
          const pid = this.user.project_affiliation[index];
          Projects.get(pid, accessToken).then((newEvent) => {
            newProjects.push(newEvent.data);
          });
        }
      });

      this.$set(this, "projects", newProjects);
    },
  },
  mounted() {
    this.getUser(2);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background-color: #d7d7d7;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 350px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}
</style>


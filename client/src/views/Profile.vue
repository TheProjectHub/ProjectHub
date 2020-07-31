<template>
<html>
  <head></head>
  <body>
    <div class="profile">
      <div class="toprow">
        <div class="PP">
          <img alt="Vue logo" src="../assets/logo.png" />
        </div>
        <div class="user">
          <div class="name">
            <h2>{{this.user.first_name}} {{this.user.last_name}}</h2>
            <h3 v-if="!this.user.looking_for_project">is looking for a project!</h3>
          </div>
          <p>
            <strong>{{this.user.age}} yrs old</strong>
          </p>
          <p>
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            {{this.user.location}}
          </p>
          <a href="/conversations" type="button" class="msg-btn">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>Send Message
          </a>
          <p>{{this.user.bio}}</p>
        </div>
      </div>
      <div class="bottomrow">
        <div class="skills">
          <h3>I have skills in:</h3>
          <ul style="list-style:none" v-for="skill in this.user.skills" :key="skill">{{skill}}</ul>
        </div>
        <div class="projects">
          <h3>I am affiliated with these projects:</h3>
          <ul
            style="list-style:none"
            v-for="project in this.user.projects"
            :key="project"
          >{{project.name}}</ul>
        </div>
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
    this.getUser(1);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile {
  width: 80%;
  padding: 3px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 3%;
}
.toprow {
  height: 40%;
  width: 100%;
}
.PP {
  float: left;
  position: relative;
  width: 25%;
  height: 80%;
  margin-top: 8px;
}
.PP img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  margin-top: auto;
}
.user {
  float: left;
  width: 70%;
  height: 80;
}
.bottomrow {
  height: 40%;
  width: 100%;
}
.skills {
  float: left;
  position: relative;
  width: 50%;
  height: 80%;
  margin-top: 8px;
  text-align: center;
}
.projects {
  float: left;
  position: relative;
  width: 50%;
  height: 80%;
  margin-top: 8px;
  text-align: center;
}
.msg-btn {
  background: #fff;
  padding: 5px 11px;
  color: black;
  text-decoration: none;
  font-size: 13px;
}
.msg-btn i {
  padding: 0;
  color: black;
  margin-right: 7px;
}
h1,
p,
h2,
h3 {
  color: white;
}
</style>


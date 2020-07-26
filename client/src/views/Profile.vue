<template>
  <html>
    <div class="main">
      <div class="row personal-info" style="padding-top: 20px">
        <div class="col profile-picture">
          <img alt="Vue logo" src="../assets/logo.png" />
        </div>
        <div class="col text-info1">
          <div class="row first-name">
            <p>First name: {{ this.user.first_name }}</p>
          </div>
          <div class="row age">
            <p>Age: {{ this.user.age }}</p>
          </div>
        </div>
        <div class="col text-info2">
          <div class="row last-name">
            <p>Last name: {{ this.user.last_name }}</p>
          </div>
          <div class="row location">
            <p>Location: {{ this.user.location }}</p>
          </div>
        </div>
      </div>
      <div class="row bio">
        <div class="col">
          <h2>Bio</h2>
          <p>{{ this.user.bio }}</p>
        </div>
      </div>
      <div class="row vocational">
        <div class="col skills">
          <h2>Skills</h2>
          <ul
            style="list-style: none"
            v-for="skill in this.user.skills"
            :key="skill"
          >
            {{
              skill
            }}
          </ul>
        </div>
        <div class="col user-projects">
          <div class="update-looking-for-project">
            <p v-if="!this.user.looking_for_project">
              Actively looking for projects!
            </p>
          </div>
          <div class="project-affiliations">
            <h2>Project affiliations</h2>
            <ul
              style="list-style: none"
              v-for="project in this.projects"
              :key="project"
            >
              {{
                project.name
              }}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </html>
</template>

<script>
/* eslint-disable */
import User from '../services/Users';
import Projects from '../services/Projects';

export default {
  name: 'Profile',
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
        this.$set(this, 'user', event.data);

        // Convert string representation of skills to array object
        const skills = event.data.skills;
        this.user.skills = skills.substring(1, skills.indexOf(']')).split(', ');

        // Convert string representation of project_affiliations to array object
        const project_affiliation = event.data.project_affiliation;
        this.user.project_affiliation = project_affiliation
          .substring(1, project_affiliation.indexOf(']'))
          .split(', ');

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

      this.$set(this, 'projects', newProjects);
    },
  },
  mounted() {
    this.getUser(2);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

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
              <h2>
                {{ this.$store.state.currentUser.first_name }}
                {{ this.$store.state.currentUser.last_name }}
              </h2>
              <h3 v-if="!this.$store.state.currentUser.looking_for_project">
                is looking for a project!
              </h3>
            </div>
            <p>
              <strong>{{ this.$store.state.currentUser.age }} yrs old</strong>
            </p>
            <p>
              <i class="fa fa-map-marker" aria-hidden="true"></i>
              {{ this.$store.state.currentUser.location }}
            </p>
            <a href="/conversations" type="button" class="msg-btn">
              <i class="fa fa-envelope-o" aria-hidden="true"></i>Send Message
            </a>
            <p>{{ this.$store.state.currentUser.bio }}</p>
          </div>
        </div>
        <div class="bottomrow">
          <div class="skills">
            <h3>I have skills in:</h3>
            <ul
              style="list-style:none"
              v-for="(skill, index) in userSkills"
              :key="index"
            >
              {{
                skill
              }}
            </ul>
          </div>
          <div class="projects">
            <h3>I am affiliated with these projects:</h3>
            <ul
              style="list-style:none"
              v-for="(project, index) in projects"
              :key="index"
            >
              {{
                project.name
              }}
            </ul>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>

<script>
import Projects from '../services/Projects';

export default {
  name: 'Profile',
  data() {
    return {
      projects: [],
      userSkills: [],
    };
  },
  methods: {
    async setProjects() {
      const userSkills = this.$store.state.currentUser.skills;
      try {
        this.userSkills = JSON.parse(userSkills);
      } catch (error) {
        this.userSkills = userSkills
          .substring(1, userSkills.indexOf(']'))
          .split(', ');
      }

      const accessToken = await this.$auth.getTokenSilently();
      const projectIds = JSON.parse(
        this.$store.state.currentUser.project_affiliation,
      );
      projectIds.forEach((pid) => {
        Projects.get(pid, accessToken).then((event) => {
          this.projects.push(event.data);
        });
      });
    },
  },
  mounted() {
    const checkIsAuthLoaded = setInterval(() => {
      if (
        this.$store.state.currentUser.project_affiliation && // eslint-disable-line
        this.$store.state.currentUser.skills
      ) {
        this.setProjects();
        clearInterval(checkIsAuthLoaded);
      }
    }, 100);
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

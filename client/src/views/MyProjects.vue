<template>
  <html>
    <div class="row container">
      <div class="col-xs-12 project-entries">
        <h1>{{ this.$store.state.currentUser.first_name }}'s Projects</h1>
        <div
          v-for="project in projects"
          :key="project.name"
          class="project-entry"
          @click="navigateToProject(project.id)"
        >
          <h3>{{ project.name }}</h3>
          <span>Members: </span>
          <span v-for="(member, index) in project.members" :key="member"
            ><span v-if="isUser(member)">Me</span
            ><span v-else> {{ member }}</span
            ><span v-if="index != project.members.length - 1"> | </span></span
          >
        </div>
      </div>
    </div>
  </html>
</template>

<script>
import { getProject } from "../services/Projects";
import { getUser } from "../services/Users";

import { onceAuthIsLoaded } from "../utilities/auth/auth.utility";
import { onceCurrentUserIsSet } from "../utilities/vuex/vuex.utility";

export default {
  name: "MyProjects",
  data() {
    return { projects: [], accessToken: "" };
  },
  methods: {
    async setProjects() {
      const projectIds = JSON.parse(
        this.$store.state.currentUser.project_affiliation
      );

      projectIds.forEach(async id => {
        const project = await getProject(id, this.accessToken);
        let userNames = [];
        let members = JSON.parse(project.data.members);

        members.forEach(async id => {
          const user = await getUser(id, this.accessToken);
          userNames.push(`${user.data.first_name} ${user.data.last_name}`);
        });

        this.projects.push({
          id: project.data.id,
          name: project.data.name,
          members: userNames
        });
      });
    },
    navigateToProject(id) {
      this.$router.push(`/projects/${id}`);
    },
    isUser(name) {
      return (
        name ==
        `${this.$store.state.currentUser.first_name} ${this.$store.state.currentUser.last_name}`
      );
    }
  },
  mounted() {
    onceAuthIsLoaded(this.$auth, async () => {
      this.accessToken = await this.$auth.getTokenSilently();

      onceCurrentUserIsSet(this.$store, async () => {
        this.setProjects();
      });
    });
  }
};
</script>

<style scoped>
h1 {
  color: white;
}
.project-entries {
  padding-left: 80px;
  text-align: left;
}
.project-entry {
  cursor: pointer;
  margin-bottom: 4vh;
  background: lightgray;
  border-radius: 25px;
  padding: 5px 10px 10px 10px;
  overflow-x: auto;
  max-width: 50vw;
}
.project-entry:hover {
  background: rgb(230, 230, 230);
}
</style>

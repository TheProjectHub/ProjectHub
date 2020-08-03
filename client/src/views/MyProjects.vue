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

export default {
  name: "MyProjects",
  data() {
    return { projects: [] };
  },
  methods: {
    async setProjects(projectIds) {
      const accessToken = await this.$auth.getTokenSilently();

      projectIds.forEach(async (id) => {
        const res = await getProject(id, accessToken);
        let userNames = [];
        let members = JSON.parse(res.data.members);

        members.forEach(async (id) => {
          const res = await getUser(id, accessToken);
          userNames.push(`${res.data.first_name} ${res.data.last_name}`);
        });
        
        this.projects.push({
          id: res.data.id,
          name: res.data.name,
          members: userNames
        });
      });
    },
    navigateToProject(id) {
      this.$router.push({
        path: "/projects",
        params: { projectId: id }
      });
    },
    isUser(name) {
      return (
        name ==
        `${this.$store.state.currentUser.first_name} ${this.$store.state.currentUser.last_name}`
      );
    }
  },
  mounted() {
    const checkIsUserLoaded = setInterval(() => {
      if (this.$store.state.currentUser.project_affiliation) {
        const projectIds = JSON.parse(
          this.$store.state.currentUser.project_affiliation
        );
        this.setProjects(projectIds);

        clearInterval(checkIsUserLoaded);
      }
    }, 100);
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

<template>
  <html>
    <!-- this needs some serious styling -->
    <div class="main">
      <div class="row" style="padding-top: 20px">
        <div class="col text-info1">
          <h1>{{ this.project.name }}</h1>
          <p v-if="this.project.looking_for_new_members">
            is looking for applicants!
          </p>
          <div class="row">
            <p v-for="(f, i) in this.projectTags" :key="i" class="tag-label">
              {{ f }}
            </p>
          </div>
          <div class="row">
            <p>Description: {{ this.project.description }}</p>
          </div>
          <div>
            <p>Applicants:</p>
            <p v-for="(applicant, i) in this.projectApplicants" :key="i">
              {{ applicant.user.first_name }} {{ applicant.user.last_name }}
              <br />
              Votes: {{ applicant.appObj.votes }}
              <br />
            </p>
          </div>
        </div>
        <div class="col">
          <div>
            <p>Members:</p>
            <p v-for="(m, i) in projectMembers" :key="i">
              {{ m.first_name }} {{ m.last_name }}
              <br />
            </p>
          </div>
          <br />
          <div>
            <p>Links:</p>
            <a
              v-for="(link, i) in this.projectLinks"
              :key="i"
              :href="goodLink(link)"
            >
              {{ link }}
              <br />
            </a>
          </div>
        </div>
      </div>
    </div>
  </html>
</template>

<script>
import { getUser } from "../services/Users";
import { getProject } from "../services/Projects";

import { onceAuthIsLoaded } from "../utilities/auth/auth.utility";
import { onceCurrentUserIsSet } from "../utilities/vuex/vuex.utility";

export default {
  name: "Project",
  data() {
    return {
      projectId: this.$route.params.projectId,
      project: {},
      projectMembers: [],
      projectTags: [],
      projectLinks: [],
      projectApplicants: [],
      accessToken: ""
    };
  },
  methods: {
    async getProject(id) {
      const project = await getProject(id, this.accessToken);
      this.project = project.data;

      JSON.parse(this.project.members).forEach(async m => {
        const user = await getUser(m, this.accessToken);
        this.projectMembers.push(user.data);
      });

      this.projectTags = JSON.parse(this.project.search_filters);
      this.projectLinks = JSON.parse(this.project.links);

      JSON.parse(this.project.applicants).forEach(async applicantObject => {
        const user = await getUser(applicantObject["user-id"], this.accessToken);
        this.projectApplicants.push({
          user: user.data,
          appObj: applicantObject
        });
      });
    },
    goodLink(url) {
      return !(url.startsWith("http://") || url.startsWith("https://"))
        ? `http://${url}`
        : url;
    }
  },
  mounted() {
    onceAuthIsLoaded(this.$auth, async () => {
      this.accessToken = await this.$auth.getTokenSilently();
      onceCurrentUserIsSet(this.$store, () => {
        this.getProject(this.projectId);
      });
    });
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
.tag-label {
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
  background-color: rgba(76, 76, 76, 0.3);
  color: #fff;
  padding: 5px 8px;
  border: none;
  margin: 5px 5px;
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

<template>
  <html>
    <div class="main">
      <div class="row personal-info" style="padding-top: 20px">
        <div class="col text-info1">
          <div class="row">
            <p>Project name: {{ this.project.name }}</p>
          </div>
          <div class="row">
            <p>Description: {{ this.project.description }}</p>
          </div>
          <div class="row">
            <p>Tags: {{ this.project.search_filters }}</p>
          </div>
          <div class="row">
            <p>Links: {{ this.project.links }}</p>
          </div>
        </div>
        <div class="col text-info2">
          <div class="row">
            <p>Members: {{ this.project.members }}</p>
          </div>
          <div class="row">
            <p>Open For Applicants: {{ this.project.looking_for_new_members }}</p>
          </div>
          <div class="row">
            <p>Applicants: {{ this.project.applicants }}</p>
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
  name: 'Project',
  data() {
    return {
      project: {},
    };
  },
  methods: {
    async getProject(id) {
        // Get the access token from the auth wrapper
      const accessToken = await this.$auth.getTokenSilently();

      Projects.get(id, accessToken).then((event) => {
        console.log(event.data);
        this.project = event.data;
      });
    },
  },
  mounted() {
    this.getProject(1); // <- this will be dynamically set in later updates
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

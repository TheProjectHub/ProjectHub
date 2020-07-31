<template>
  <html>
    <div class="main">
      <div class="row personal-info" style="padding-top: 20px">
        <!-- <div class="col profile-picture">
          <img alt="Vue logo" src="../assets/logo.png" />
        </div> -->
        <div class="col text-info1">
          <div class="row first-name">
            <p>First name: {{ this.project }}</p>
          </div>
          <div class="row age">
            <p>Age: {{  }}</p>
          </div>
        </div>
        <div class="col text-info2">
          <div class="row last-name">
            <p>Last name: {{  }}</p>
          </div>
          <div class="row location">
            <p>Location: {{  }}</p>
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

      console.log(accessToken);

      Projects.get(id, accessToken).then((event) => {
        console.log('what in the fuck')
        console.log(event.data);
        this.project = event.data

      });
    },
  },
  mounted() {
    this.getUser(1);
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

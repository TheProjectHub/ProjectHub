<template>
  <html>
    <section id="new" class="main">
      <form>
        <h1 class="title is-1">
          New Project
        </h1>
        <div class="field">
          <label class="label">Project Name:</label>
          <div class="control">
            <input class="input" type="text" v-model="form.projectName" />
          </div>
        </div>
        <div class="field">
          <label class="label">Description:</label>
          <div class="control">
            <input class="input" type="text" v-model="form.description" />
          </div>
        </div>
        <div class="field">
          <label class="label">Invite:</label>
          <div class="control">
            <input class="input" type="text" v-model="form.invite" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label>
              <input type="checkbox" value="yes" v-model="form.look" />
              Looking for New Members?
            </label>
          </div>
        </div>
        <input class="button is-primary margin-bottom" type="submit" @click.prevent="toSubmit" />
    </form>
       <transition name="fade" mode="out-in">
        <article class="message is-primary" v-show="showSubmitFeedback">
          <div class="message-header">
            <p>Status:</p>
          </div>
          <div class="message-body">
            Successfully Submitted!
          </div>
        </article>
      </transition>
        
    <hr>
    
    <h5>
        JSON
    </h5>
    <pre><code>{{form}}</code></pre>
    </section>
  </html>
</template>

<script>
/* eslint-disable */
import User from '../services/Users';
import Projects from '../services/Projects';
export default {
  name: 'newproject',
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
      //const newProjects = [];
      // Use the eventService to call the getEventSingle method
      User.get(id, accessToken).then((event) => {
        this.$set(this, 'user', event.data);
        const look = event.data.looking_for_project;
        // // Convert string representation of skills to array object
        // const skills = event.data.skills;
        // this.user.skills = skills.substring(1, skills.indexOf(']')).split(', ');
        // // Convert string representation of project_affiliations to array object
        // const project_affiliation = event.data.project_affiliation;
        // this.user.project_affiliation = project_affiliation
        //   .substring(1, project_affiliation.indexOf(']'))
        //   .split(', ');
        // // Loop through project affiliations and get objects by id
        // for (
        //   let index = 0;
        //   index < this.user.project_affiliation.length;
        //   index += 1
        // ) {
        //   const pid = this.user.project_affiliation[index];
        //   Projects.get(pid, accessToken).then((newEvent) => {
        //     newProjects.push(newEvent.data);
        //   });
        // }
      });
      //this.$set(this, 'projects', newProjects);
    },
    async getProjectNameAvail(id) {
        
    },
  },
  mounted() {
    this.getUser(2);
  },
};
new Vue({
  el: '#new',
  data: {
    form: {
      projectName: '',
      description: '',
      invite: '',
      look: [],
    },
    showSubmitFeedback: false
  },
  methods: {
    toSubmit(){
      this.showSubmitFeedback = true;
      setTimeout(() => {
        this.showSubmitFeedback = false;
      }, 3000);
    }
  }
});
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
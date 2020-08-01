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
          <label class="label">Links:</label>
          <div class="control">
            <input class="input" type="text" v-model="form.links" />
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
        <input
          class="button is-primary margin-bottom"
          type="submit"
          @click.prevent="toSubmit"
          @click="submitProject"
        />
      </form>
    </section>
  </html>
</template>

<script>
import Projects from '../services/Projects';

export default {
  name: 'NewProject',
  data() {
    return {
      takenProjectNames: [],
      form: {
        projectName: '',
        description: '',
        links: '',
        look: [],
      },
    };
  },
  methods: {
    async getTakenProjectNames() {
      const accessToken = await this.$auth.getTokenSilently();

      Projects.getAllProjectNames(accessToken).then((event) => {
        const takenNames = event.data;
        takenNames.forEach((project) => {
          this.takenProjectNames.push(project.name);
        });
      });
    },
    isNameTaken(name) {
      return this.takenProjectNames.includes(name);
    },
    async submitProject() {
      if (this.isNameTaken(this.form.projectName) && this.form.name) {
        alert(`The name: ${this.form.projectName} is taken!`); // eslint-disable-line
      } else {
        const accessToken = await this.$auth.getTokenSilently();

        const project = {
          members: JSON.stringify([this.$store.state.currentUser.id]),
          name: this.form.projectName,
          links: this.form.links,
          description: this.form.description,
          looking_for_new_members: this.form.look.length,
          search_filters: '[]',
          applicants: '[]',
        };
        Projects.create(project, accessToken).then(() => {
          this.$router.push('/');
        });
      }
    },
  },
  mounted() {
    const checkIsAuthLoaded = setInterval(() => {
      if (!this.$auth.loading) {
        this.getTakenProjectNames();
        clearInterval(checkIsAuthLoaded);
      }
    }, 100);
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

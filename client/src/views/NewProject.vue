<template>
  <html>
    <head>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Comfortaa:wght@700&family=Lato&family=Patrick+Hand&display=swap"
        rel="stylesheet"
      />
    </head>
    <section class="main">
      <form>
        <h1 style="font-family: Comfortaa, cursive; padding: 10px" class="title is-1">
          New Project
        </h1>
        <div class="field">
          <label class="label" style="font-family: Comfortaa, cursive">Project Name:</label>
          <div class="control">
            <input class="input" type="text" size = "40" v-model="form.projectName" />
          </div>
        </div>
        <div class="field">
          <label class="label" style="font-family: Comfortaa, cursive">Description:</label>
          <div class="control">
            <textarea rows="4" cols="50" v-model="form.description"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label" style="font-family: Comfortaa, cursive">Links:</label>
          <div class="control">
            <input class="input" type="text" size = "75" v-model="form.links" />
          </div>
        </div>
        <div class="field">
          <label>
            <input type="checkbox" value="true" v-model="form.lookingForNewMembers" />
            Looking for New Members?
          </label>
        </div>
        <input
          class="btn btn-primary margin-bottom"
          type="submit"
          @click.prevent="preventSubmit"
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
        lookingForNewMembers: ['true'],
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
    async preventSubmit() {
      if (this.form.projectName === '') {
        this.showSubmitFeedback = true;
        setTimeout(() => {
          this.showSubmitFeedback = false;
        }, 3000);
      }
    },
    async submitProject() {
      if (this.isNameTaken(this.form.projectName) && this.form.name) {
        alert(`The name: ${this.form.projectName} is taken!`); // eslint-disable-line
      } else {
        const accessToken = await this.$auth.getTokenSilently();
        const project = {
          members: JSON.stringify([this.$store.state.currentUser.id]),
          name: this.form.projectName,
          links: JSON.stringify(this.form.links.split(' ')),
          description: this.form.description,
          looking_for_new_members: this.form.lookingForNewMembers.length,
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

<style scoped>
p,
h2,
ul {
  color: white;
}
.margin-bottom {
  margin-bottom: 15vh;
}
.row {
  max-width: 83vw;
  margin: auto;
}
h1{
  font-size: 10vh;
}
h3 {
  margin: 40vh 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10vh;
}
.label {
  font-size: 5vh;
  margin: 1vh;
}
a {
  color: #42b983;
}
html {
  background: white;
  background-size: 400% 400%;
  height: 100vh;
  align-items: left;
}
</style>

<template>
  <div class="hello">
    <p v-if="$auth.isAuthenticated">
      What's up, {{ $auth.user.name }}! User data: {{ this.user.first_name }}
    </p>
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button
        v-if="!$auth.isAuthenticated"
        @click="login"
        class="button is-dark"
      >
        <strong>Sign in</strong>
      </button>
      <!-- show logout when authenticated -->
      <button
        v-if="$auth.isAuthenticated"
        @click="logout"
        class="button is-dark"
      >
        <strong>Log out</strong>
      </button>
    </div>
    <button
      type="button"
      class="btn btn-primary"
      style="margin-bottom: 20px"
      v-on:click="getUser(1)"
    >
      Click Me!
    </button>
  </div>
</template>

<script>
import User from '../services/Users';

export default {
  name: 'HelloWorld',
  data() {
    return {
      user: { first_name: 'lmao' },
    };
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
    async getUser(id) {
      // Get the access token from the auth wrapper
      const accessToken = await this.$auth.getTokenSilently();

      // Use the eventService to call the getEventSingle method
      User.get(id, accessToken).then((event) => {
        this.$set(this, 'user', event.data);
        /* eslint-disable-next-line */
        console.log(this.user);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>

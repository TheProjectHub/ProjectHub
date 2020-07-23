<template>
  <div class="hello">
    <p v-if="$auth.isAuthenticatedÎ">What's up, {{ $auth.user.name }}!</p>
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login" class="button is-dark">
        <strong>Sign in</strong>
      </button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout" class="button is-dark">
        <strong>Log out</strong>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
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

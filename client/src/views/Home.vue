<template>
  <html>
    <head>
      <title>Welcome to Projectly</title>
    </head>
    <body>
      <div class="home">
        <Splash />
      </div>
    </body>
  </html>
</template>

<script>
import Splash from '../components/Splash.vue';
import User from '../services/Users';

export default {
  name: 'Home',
  components: {
    Splash,
  },
  methods: {
    async setCurrentUser() {
      const accessToken = await this.$auth.getTokenSilently();
      // Use the eventService to call the getEventSingle method
      User.get(this.$auth.user.email, accessToken).then((event) => {
        this.$store.commit('updateCurrentUser', event.data);
      });
    },
  },
  mounted() {
    setTimeout(() => this.setCurrentUser(), 2000);
  },
};
</script>

<style>
body {
  background: linear-gradient(-45deg, #fbff21, #23a6d5, #500000) fixed;
  background-size: 400% 400%;
  animation: gradient 45s ease infinite;
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

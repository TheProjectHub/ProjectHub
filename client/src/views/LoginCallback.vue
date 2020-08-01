<template>
  <div class="callback"></div>
</template>

<script>
import User from '../services/Users';

export default {
  name: 'callback',
  methods: {
    async checkIfUserExists() {
      const accessToken = await this.$auth.getTokenSilently();
      try {
        User.get(this.$auth.user.email, accessToken).then((event) => {
          if (event.data.email) {
            this.$router.push('/');
          }
        });
      } catch (error) {
        console.log('User not found in db, sending to login page.');
      } finally {
        this.$router.push('/signup');
      }
    },
  },
  mounted() {
    const checkIsAuthLoaded = setInterval(() => {
      if (!this.$auth.loading) {
        this.checkIfUserExists();
        clearInterval(checkIsAuthLoaded);
      }
    }, 10);
  },
};
</script>

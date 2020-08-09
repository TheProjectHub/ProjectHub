<template>
  <div class="callback"></div>
</template>

<script>
import { getUser } from "../services/Users";
import { onceAuthIsLoaded } from "../utilities/auth/auth.utility";

export default {
  name: "callback",
  methods: {
    async checkIfUserExists() {
      const accessToken = await this.$auth.getTokenSilently();

      try {
        getUser(this.$auth.user.email, accessToken).then(event => {
          if (event.data.email) {
            this.$router.push("/");
          }
        });
      } catch (error) {
        console.log("User not found in db, sending to login page.");
        this.$router.push("/signup");
      }
    }
  },
  mounted() {
    onceAuthIsLoaded(this.$auth, this.checkIfUserExists);
  }
};
</script>

<style scoped>
.v-sidebar-menu {
  display: none;
}
</style>

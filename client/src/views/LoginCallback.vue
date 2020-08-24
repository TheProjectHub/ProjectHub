<template>
  <div class="callback"></div>
</template>

<script>
import { getUser } from "../services/Users";
import { onceAuthIsLoaded } from "../utilities/auth/auth.utility";

export default {
  name: "LoginCallback",
  methods: {
    async checkIfUserExists() {
      const accessToken = await this.$auth.getTokenSilently();

      try {
        const event = await getUser(this.$auth.user.email, accessToken);
        if (event.data.email) this.$router.push("/");
      } catch (err) {
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

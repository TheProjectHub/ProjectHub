<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>Hello, {{ this.$store.state.currentUser.first_name }}  {{this.$auth.user.name}}!</h2>
    <button @click="this.lmao"></button>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.currentUser);
  },
  methods: {
    lmao() {
      console.log(this.$store.state.currentUser);
    },
  },
};
</script>

<template>
  <div class="home">
    <<<<<<< HEAD
    <HelloWorld msg="Welcome to Your Vue.js App" />
    =======
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button
      type="button"
      class="btn btn-primary"
      style="margin-bottom: 20px"
      v-on:click="greet"
    >
      Click Me!
    </button>
    >>>>>>> c41f5e10f3e8d29a74e9c00096eb7998c0185ede
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    greet() {
      // eslint-disable-next-line
      alert("Wassup!");
    },
  },
};
</script>

<style lang="stylus"></style>

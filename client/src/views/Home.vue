<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button type="button" class="btn btn-primary" style="margin-bottom: 20px"
    v-on:click="greet">Click Me!</button>
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
      alert('Wassup!');
    },
  },
};
</script>

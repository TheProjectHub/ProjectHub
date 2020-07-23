<template>
<html>
  <head>
    <title>Welcome to Projectly</title>
  </head>
  <body>
    <div class="home">
      <Brandname />
    </div>
  </body>
</html>
</template>

<script>
// @ is an alias to /src
import Brandname from "../components/Brandname.vue";
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    Brandname,
  },
};
</script>

<style>
body {
  background: linear-gradient(-45deg, #b721ff, #23a6d5, #500000) fixed;
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

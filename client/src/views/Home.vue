<template>
<html>
  <head>
    <title>Welcome to Projectly</title>
  </head>
  <body>
    <div class="home">
      <HelloWorld msg="Howdy" />
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
    HelloWorld
  }
};
</script>

<style>
body {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
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

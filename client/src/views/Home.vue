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
  background: linear-gradient(#21defd, #b721ff) fixed;
}
</style>

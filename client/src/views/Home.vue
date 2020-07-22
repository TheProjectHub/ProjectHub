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

export default {
  name: "Home",
  components: {
    Brandname
  }
};
</script>

<style>
body {
  background: linear-gradient(#88ff00, #40a3ff) fixed;
}
</style>

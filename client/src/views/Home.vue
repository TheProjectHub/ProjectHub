<template>
<body>
  <div class="home">
    <Brandname />
  </div>
</body>
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
  background: linear-gradient(#500000, #000000) fixed;
}
</style>

<template>
  <div class="row">
    <div class="column">
      <h1>Find Your Team with Projectly</h1>
    </div>
    <div class="column" style="grad1">
      <img alt="Vue logo" src="../assets/Logo.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Brandname",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 70px;
  color: white;
}
.column {
  float: left;
  width: 50%;
  height: 100%;
  padding: 30px;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
#grad1 {
  text-align: center;
}
</style>

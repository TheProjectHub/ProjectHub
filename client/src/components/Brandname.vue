<template>
<html>
  <head>
    <title>Welcome to Projectly</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
      rel="stylesheet"
    />
  </head>
  <div class="row">
    <div class="column">
      <h1>Find Your Team with Projectly</h1>
    </div>
    <div class="column">
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div class="intro">
      <h2>
        Here at Projectly, we want to help you change the world, by letting you find other like
        minded indiviuals to accomplish your task. Whether it be in the music and tech inudstry or
        hollywood, we are here to help you find your team. Go change the world.
      </h2>
    </div>
  </div>
</html>
</template>

<script>
import User from "../services/Users";

export default {
  name: "Brandname",
  props: {
    currentUser: { first_name: "" },

    msg: String,
  },
  methods: {
    getName(id) {
      User.get(id).then((res) => {
        this.currentUser = res.data;
      });
    },
  },
  mounted() {
    this.getName(1);
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 100px;
  color: white;
  font-family: "Poppins", sans-serif;
}
.column {
  float: left;
  width: 50%;
  height: 100%;
  padding: 30px;
  text-align: center;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
.intro {
  width: 80%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
h2 {
  color: white;
  font-family: "Poppins", sans-serif;
}
</style>

<template>
  <div class="row">
    <div class="column">
      <h1>Find Your Team with Projectly</h1>
    </div>
    <div class="column">
      <img alt="Vue logo" src="../assets/Logo(400).png" />
    </div>
    <div>
      <p style="color: white; text-align: center">
        User firstname: {{ currentUser.first_name }}
      </p>
    </div>
  </div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 100px;
  color: white;
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
</style>

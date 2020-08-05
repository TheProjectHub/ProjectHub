<template>
  <v-app>
    <v-content class="gradint-background">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md5>
            <v-card class="elevation-12" max-width="344" outlined>
              ok
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.gradint-background {
  background: linear-gradient(-45deg, #239472, #23a6d5, #6d1919) fixed;
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

<template>
  <html>
    <head>
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&family=Lato&family=Patrick+Hand&display=swap"
        rel="stylesheet"
      />
    </head>
    <div class="row">
      <div class="column">
        <h1>
          Find Your Team with
          <span
            style="background-color: rgba(255, 255, 255, 0.5);
            color: transparent; border-radius: 25px; padding-bottom: 10px"
          >
            <span
              style="font-family: Comfortaa, cursive; padding: 10px"
              class="gradient"
              >Projectly</span
            >
          </span>
        </h1>
      </div>
      <div class="column">
        <img src="../assets/logo.png" style="margin-top: -2vh;" />
      </div>
      <div class="intro">
        <h2 style="margin-bottom: 2vh;">
          Here at Projectly, we want to help you change the world by providing
          you with a platform to find other like-minded indiviuals. Whether you
          want to disrupt the music industry, create new businesses, or even use
          your creativity to create the newest blockbuster we are here for you.
          Go change the world!
        </h2>
        <h2 style="font-size: 25px; margin-bottom: 2vh;">
          -Your Friends at Projectly
        </h2>
      </div>
    </div>
    <div class="login-button text-center">
      <div v-if="!$auth.loading">
        <button
          v-if="!$auth.isAuthenticated"
          @click="login"
          class="btn btn-light"
        >
          <strong>Get Started!</strong>
        </button>
        <button
          v-if="$auth.isAuthenticated"
          @click="logout"
          class="btn btn-light"
        >
          <strong>Log out</strong>
        </button>
      </div>
    </div>
    <footer>
      <p style="padding-top: 2vh;">Copyright &copy; 2020 Projectly</p>
    </footer>
  </html>
</template>

<script>
export default {
  name: "Splash",
  methods: {
    login() {
      this.$auth.loginWithRedirect("/logincallback");
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 90px;
  color: white;
  font-family: "Lato", sans-serif;
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
.row {
  max-width: 83vw;
  margin: auto;
}
.intro {
  width: 80%;
  max-width: 98vw;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
h2 {
  color: white;
  font-family: "Lato", sans-serif;
}
p {
  color: white;
  font-family: "Lato", sans-serif;
  text-align: center;
}

html {
  max-width: 100vw;
}

button {
  width: 50%;
}

.gradient {
  background: linear-gradient(-45deg, #b721ff, #23a6d5, #500000) fixed;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 5s ease infinite;
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

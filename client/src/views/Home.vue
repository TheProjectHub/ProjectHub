<template>
  <html>
    <body>
      <div class="home">
        <Splash />
      </div>
    </body>
  </html>
</template>

<script>
import Splash from '../components/Splash.vue';

export default {
  name: 'Home',
  components: {
    Splash,
  },
};
</script>

<style>
body {
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

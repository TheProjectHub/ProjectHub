import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

import Vue from 'vue';
import VueSidebarMenu from 'vue-sidebar-menu';
import App from './App.vue';
import router from './router';

// Navbar (Sidebar)
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

// Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { domain, clientId, audience } from '../auth_config.json';

// Import the plugin here
import { Auth0Plugin } from './auth';

// Plugin Navbar
Vue.use(VueSidebarMenu);

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname // eslint-disable-line
    );
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

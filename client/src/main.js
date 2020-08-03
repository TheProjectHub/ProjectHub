import Vue from "vue";
import Vuex from "vuex";
import VueSidebarMenu from "vue-sidebar-menu";

import App from "./App.vue";
import router from "./router";

// Navbar (Sidebar)
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

// Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { domain, clientId, audience } from "../auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./auth";

// Plugin Navbar
Vue.use(VueSidebarMenu);

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
  redirectUri: "http://localhost:8080/logincallback"
});

// Setup dev mode
Vue.config.productionTip = false;

Vue.use(Vuex);

// Vuex state configuration
const store = new Vuex.Store({
  state: {
    currentUser: {}
  },
  mutations: {
    updateCurrentUser(state, newUser) {
      state.currentUser = newUser;
    }
  }
});

new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");

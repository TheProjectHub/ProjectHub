<template>
  <html>
    <div id="app">
      <v-app>
        <v-main>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
            integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
            crossorigin="anonymous"
          />
          <sidebar-menu
            v-if="Object.values(this.$store.state.currentUser).length"
            @toggle-collapse="this.onToggleCollapse"
            :menu="menu"
            :collapsed="collapsed"
            @item-click="onItemClick"
          />
          <router-view />
          <div id="fade-to-black"></div>
        </v-main>
      </v-app>
    </div>
  </html>
</template>

<script>
import { getUser } from "./services/Users";
import { onceAuthIsLoaded } from "./utilities/auth/auth.utility";

export default {
  name: "App",
  components: {},
  data() {
    return {
      isNavBarOpen: false,
      collapsed: true,
      menu: [
        {
          header: true,
          title: "Projectly",
          hiddenOnCollapse: true
        },
        {
          href: "/profile",
          title: "Profile",
          icon: "fa fa-user"
        },
        {
          href: "/my-projects",
          title: "My Projects",
          icon: "fa fa-chart-area"
        },
        {
          href: "/search",
          title: "Search for Projects",
          icon: "fa fa-search"
        },
        {
          href: "/messaging",
          title: "Conversations",
          icon: "fa fa-comment"
        },
        {
          href: "/new-project",
          title: "Create New Project",
          icon: "fa fa-plus"
        },
        {
          title: "Logout",
          icon: "fa fa-user-times"
        }
      ]
    };
  },
  methods: {
    onToggleCollapse() {
      this.isNavBarOpen = !this.isNavBarOpen;
      document.getElementById("fade-to-black").style.display = this.isNavBarOpen
        ? "block"
        : "none";
    },
    onItemClick(event, item) {
      if (item.title === "Logout") {
        this.$auth.logout();
      }
    },
    async setCurrentUser() {
      const accessToken = await this.$auth.getTokenSilently();

      getUser(this.$auth.user.email, accessToken).then(event => {
        if (event) this.$store.commit("updateCurrentUser", event.data);
      });
    }
  },
  mounted() {
    onceAuthIsLoaded(this.$auth, this.setCurrentUser);
    document.title = "Projectly";
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: none;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: white;
}

#fade-to-black {
  background: rgba(0, 0, 0, 0.5);
  display: none;
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 5;
}
</style>

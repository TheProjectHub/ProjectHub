<template>
  <html>
    <div id="app">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous"
      />
      <sidebar-menu
        v-if="$auth.isAuthenticated"
        @toggle-collapse="this.onToggleCollapse"
        :menu="menu"
        :collapsed="collapsed"
        @item-click="onItemClick"
      />
      <router-view />
      <div id="fade-to-black"></div>
    </div>
  </html>
</template>

<script>
import User from './services/Users';

export default {
  // profile (via a profile picture), MyProjects, Search, conversations. Try to use icons for each.
  name: 'App',
  components: {},
  data() {
    return {
      isNavBarOpen: false,
      collapsed: true,
      menu: [
        {
          header: true,
          title: 'Projectly',
          hiddenOnCollapse: true,
        },
        {
          href: '/profile',
          title: 'Profile',
          icon: 'fa fa-user',
        },
        {
          href: '/myprojects',
          title: 'My Projects',
          icon: 'fa fa-chart-area',
        },
        {
          href: '/search',
          title: 'Search for Projects',
          icon: 'fa fa-search',
        },
        {
          href: '/conversations',
          title: 'Conversations',
          icon: 'fa fa-comment',
        },
        {
          href: '/new-project',
          title: 'Create New Project',
          icon: 'fa fa-plus',
        },
        {
          title: 'Logout',
          icon: 'fa fa-user-times',
        },
      ],
    };
  },
  methods: {
    async setUser() {
      const accessToken = await this.$auth.getTokenSilently();
      User.get(this.$auth.user.email, accessToken).then((event) => {
        this.$store.commit('updateCurrentUser', event.data);
      });
    },
    onToggleCollapse() {
      this.isNavBarOpen = !this.isNavBarOpen;
      document.getElementById('fade-to-black').style.display = this.isNavBarOpen
        ? 'block'
        : 'none';
    },
    onItemClick(event, item) {
      if (item.title === 'Logout') {
        this.$auth.logout();
      }
    },
  },
  mounted() {
    const checkIsAuthLoaded = setInterval(() => {
      if (!this.$auth.loading) {
        this.setUser();
        clearInterval(checkIsAuthLoaded);
      }
    }, 100);
  },
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
  height: 135vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 5;
}
</style>

import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Messaging from "../views/Messaging.vue";
import NewProject from "../views/NewProject.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import LoginCallback from "../views/LoginCallback.vue";

import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/logincallback",
    name: "LoginCallback",
    component: LoginCallback
  },
  {
    path: "/messaging",
    name: "Messaging",
    component: Messaging,
    beforeEnter: authGuard
  },
  {
    path: "/new-project",
    name: "NewProject",
    component: NewProject
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

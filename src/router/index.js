import Vue from "vue";
import VueRouter from "vue-router";
import Agente from "../views/Agente.vue";
import Master from "../views/Master.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Supervisor from "../views/Supervisor.vue";
import store from "../store";
import PageNotFound from "../views/404.vue";
import { onChange } from "../firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/agente",
    name: "Agente",
    component: Agente,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn && store.getters.isAgente) {
        next();
        return;
      } else next({ name: "login" });
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        let userLevel = store.getters.userLevel;
        next({
          name: userLevel
        });
        return;
      }
      next();
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register
    // beforeEnter: (to, from, next) => {
    //   if (store.getters.isLoggedIn && store.getters.isMaster) {
    //     next();
    //     return;
    //   } else next({ name: "login" });
    // }
  },
  {
    path: "/supervisor",
    name: "Supervisor",
    component: Supervisor,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn && store.getters.isSupervisor) {
        next();
        return;
      } else next({ name: "login" });
    }
  },
  {
    path: "/master",
    name: "Master",
    component: Master,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn && store.getters.isMaster) {
        next();
        return;
      } else next({ name: "login" });
    }
  },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach(async (to, from, next) => {
  if (await onChange) {
    next();
  } else {
    next({ name: "login" });
    //      next({ name: "login" });
  }
});
export default router;

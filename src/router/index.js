import Vue from "vue";
import VueRouter from "vue-router";
import Agente from "../views/Agente.vue";
import Secure from "../views/Secure.vue";
import Master from "../views/Master.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Supervisor from "../views/Supervisor.vue";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/agente",
    name: "Agente",
    component: Agente,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/supervisor",
    name: "Supervisor",
    component: Supervisor,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/master",
    name: "Master",
    component: Master,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/secure",
    name: "Secure",
    component: Secure,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;

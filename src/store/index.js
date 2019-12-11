import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: "Token",
    user: {
      username: "omarbastos", //localStorage.getItem("username") || "",
      level: "Agente", //localStorage.getItem("level") || "",
      grupo: "Claro" //localStorage.getItem("grupo") || ""
    }
  },
  mutations: {},
  actions: {},
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userLevel: state => state.user.level,
    userGrupo: state => state.user.grupo,
    username: state => state.user.username,
    isMaster: state => (state.user.level === "Master" ? true : false),
    isSupervisor: state => (state.user.level === "Supervisor" ? true : false),
    isAgente: state => (state.user.level === "Agente" ? true : false)
  }
});

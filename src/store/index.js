import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {
      username: localStorage.getItem("username") || "",
      level: localStorage.getItem("level") || "",
      grupo: localStorage.getItem("grupo") || ""
    }
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, { token, user }) {
      state.status = "success";
      state.token = token;
      state.user.username = user.username;
      state.user.level = user.level;
      state.user.grupo = user.grupo;
    },
    auth_eror(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/auth/register",
          data: user,
          method: "POST"
        })
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/auth/login",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;

            localStorage.setItem("token", token);
            //guardando en local storage
            localStorage.setItem("username", user.username);
            localStorage.setItem("level", user.level);
            localStorage.setItem("grupo", user.grupo);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", { token, user });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            console.log(err)
            localStorage.removeItem("token");
            reject(err);
          });
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userLevel: state => state.user.level
  }
});

import Vue from "vue";
import Vuex from "vuex";
import { usersCollection } from "../firebase";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sesionId: localStorage.getItem("sesionId") || "",
    user: {
      level: localStorage.getItem("userLevel") || "",
      grupo: localStorage.getItem("userGrupo") || "",
      fullname: localStorage.getItem("userFullName") || "",
      createdAt: localStorage.getItem("userCreatedAt") || "",
      uid: localStorage.getItem("uid") || "",
      email: localStorage.getItem("userEmail") || ""
    }
  },
  mutations: {
    STORE_SESION(state, id) {
      state.sesionId = id;
      localStorage.setItem("sesionId", id);
    },
    STORE_USUARIO(state, user) {
      state.user.grupo = user.grupo;
      state.user.level = user.level;
      state.user.email = user.email;
      state.user.uid = user.uid;
      state.user.fullname = user.fullname;
      state.user.createdAt = user.createdAt;

      localStorage.setItem("userGrupo", user.grupo);
      localStorage.setItem("userLevel", user.level);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("userFullName", user.fullname);
      localStorage.setItem("userCreatedAt", user.createdAt);
    },
    LOGOUT(state) {
      state.sesionId = "";
      state.user.level = "";
      state.user.email = "";
      state.user.uid = "";
      state.user.fullname = "";
      state.user.createdAt = "";
      state.user.grupo = "";
      localStorage.clear();
    }
  },
  actions: {
    GUARDAR_SESION: ({ commit }, id) => {
      commit("STORE_SESION", id);
    },

    TRAER_USUARIO: ({ commit }, id) => {
      return new Promise((resolve, reject) => {
        usersCollection
          .doc(id)
          .get()
          .then(
            function(doc) {
              if (doc.exists) {
                commit("STORE_USUARIO", doc.data());
                resolve(doc.data());
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            },
            error => {
              reject(error);
            }
          );
      });
    }
  },
  getters: {
    sesionId: state => state.sesionId,
    uid: state => state.user.uid,
    userLevel: state => state.user.level,
    userGrupo: state => state.user.grupo,
    userFullName: state => state.user.fullname,
    userEmail: state => state.user.email,
    isLoggedIn: state => !!state.user.uid,
    isMaster: state => (state.user.level === "Master" ? true : false),
    isSupervisor: state => (state.user.level === "Supervisor" ? true : false),
    isAgente: state => (state.user.level === "Agente" ? true : false)
  }
});

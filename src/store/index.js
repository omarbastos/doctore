import Vue from "vue";
import Vuex from "vuex";
import { usersCollection } from "../firebase";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sesionId: localStorage.getItem("sesionId") || null,
    user: JSON.parse(localStorage.getItem("user")) || null
  },
  mutations: {
    STORE_SESION(state, id) {
      state.sesionId = id;
      localStorage.setItem("sesionId", id);
    },
    STORE_USUARIO(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    LOGOUT(state) {
      state.sesionId = null;
      state.user = null;
      localStorage.clear();
    }
  },
  actions: {
    GUARDAR_SESION: ({ commit }, id) => {
      commit("STORE_SESION", id);
    },

    TRAER_USUARIO: ({ commit }, id) => {
      usersCollection
        .doc(id)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            commit("STORE_USUARIO", doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  },
  getters: {
    sesionId: state => state.sesionId,
    userLevel: state => state.user.level,
    userGrupo: state => state.user.grupo,
    fullname: state => state.user.fullname
  }
});

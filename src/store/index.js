import Vue from "vue";
import Vuex from "vuex";
import { db, usersCollection, auth } from "../firebase";
import moment from "moment";

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
      db.collection("users").doc(state.user.uid).update({
        isActive: false
      })
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
    SIGN_IN: (context, user) => {
      console.log(user.email + " " + user.password);
      return new Promise((resolve, reject) => {
        console.log(user.email + " " + user.password);
        auth.signInWithEmailAndPassword(user.email, user.password).then(
          docRef => {
            resolve(docRef);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    GUARDAR_SESION: ({ commit, getters }, id) => {
      db.collection("users").doc(getters.uid).update({
        isActive: true
      })
      commit("STORE_SESION", id);
    },
    CREAR_SESION: ({ dispatch, getters }) => {
      return new Promise((resolve, reject) => {
        let fecha = new Date()

        db.collection("sessions")
          .add({
            user: getters.uid,
            fullname: getters.userFullName,
            tardias: 0,
            grupo: getters.userGrupo,
            AI: {
              flag: false,
              startedAt: null,
              flagAt: null,
              finishedAt: null,
              totalTime: 10,
              disable: false
            },
            UP: {
              flag: false,
              startedAt: null,
              flagAt: null,
              finishedAt: null,
              totalTime: 10,
              disable: false
            },
            CF1: {
              flag: false,
              startedAt: null,
              flagAt: null,
              finishedAt: null,
              totalTime: 10,
              disable: false
            },
            CF2: {
              flag: false,
              startedAt: null,
              flagAt: null,
              finishedAt: null,
              totalTime: 10,
              disable: false
            },
            RS: {
              totalTime: null
            },
            llegada: {
              createdAt: moment(fecha).format(),
              flag: false
            },
            status: {
              text: "Disponible",
              valor: 0
            }
          })
          .then(
            docRef => {
              dispatch("GUARDAR_SESION", docRef.id);
              console.log('llega hasta aca')
              db.collection("users").doc(getters.uid).update({
                lastSession: moment(fecha).format('MMM Do YY'),
                lastSessionID: docRef.id,
              })
              resolve();
            },
            error => {
              reject(error);
            }
          );
      });
    },

    COLLECION_USUARIO: (context, { data, register }) => {
      return new Promise((resolve, reject) => {
        usersCollection
          .doc(data.user.uid)
          .set({
            uid: data.user.uid,
            email: register.email,
            fullname: register.fullname,
            level: register.level.state,
            grupo: register.grupo,
            createdAt: moment(new Date()).format(),
            isActive: false, // Para mostrar como activo o no en la tabla
            lastSession: null, // Fecha de la ultima sesión para comparar si tiene o no una sesión hoy
            lastSessionID: null // Para facilitar traer la información de una sesión ya iniciada hoy
          })
          .then(
            () => {},
            error => {
              console.log(error);
              reject(error);
            }
          );
      });
    },
    CREAR_USUARIO: ({ dispatch }, register) => {
      return new Promise((resolve, reject) => {
        auth
          .createUserWithEmailAndPassword(register.email, register.password)
          .then(
            data => {
              dispatch("COLLECION_USUARIO", { data, register });
              resolve(data);
            },
            error => {
              reject(error);
            }
          );
      });
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

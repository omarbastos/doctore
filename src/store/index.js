import Vue from "vue";
import Vuex from "vuex";
import {
  increment,
  db,
  usersCollection,
  auth,
  sessionsCollection
} from "../firebase";
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
      email: localStorage.getItem("userEmail") || "",
      horario: JSON.parse(localStorage.getItem("userHorario")) || [],
      lastSession: localStorage.getItem("lastSession") || ""
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
      state.user.horario = user.horario;
      state.user.lastSession = user.lastSession;
      localStorage.setItem("userGrupo", user.grupo);
      localStorage.setItem("lastSession", user.lastSession);
      localStorage.setItem("userLevel", user.level);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("userFullName", user.fullname);
      localStorage.setItem("userCreatedAt", user.createdAt);
      localStorage.setItem("userHorario", JSON.stringify(user.horario));
    },
    LOGOUT(state) {
      state.sesionId = "";
      state.user.lastSession = "";
      state.user.level = "";
      state.user.email = "";
      state.user.uid = "";
      state.user.fullname = "";
      state.user.createdAt = "";
      state.user.grupo = "";
      state.user.horario = "";
      localStorage.clear();
    }
  },
  actions: {
    SIGN_OUT: ({ commit, getters }) => {
      return new Promise((resolve, reject) => {
        auth.signOut().then(
          res => {
            if (getters.userLevel === "Agente") {
              sessionsCollection.doc(getters.sesionId).update({
                "status.text": "Desconectado",
                "status.valor": 5
              });
            }
            commit("LOGOUT");
            resolve(res);
          },
          error => {
            reject(error);
          }
        );
      });
    },
    SIGN_IN: (context, user) => {
      // console.log(user.email + " " + user.password);
      return new Promise((resolve, reject) => {
        //console.log(user.email + " " + user.password);
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
    GUARDAR_SESION: ({ commit }, id) => {
      return new Promise((resolve, reject) =>
        sessionsCollection
          .doc(id)
          .update({
            "status.text": "Disponible",

            "status.valor": 0
          })
          .then(
            () => {
              commit("STORE_SESION", id);

              // console.log("Ahora si se guardo la session");
              resolve();
            },
            error => {
              reject(error);
            }
          )
      );
    },
    CREAR_SESION: ({ dispatch, getters }) => {
      return new Promise((resolve, reject) => {
        let fecha = new Date();
        let horario = getters.userHorario;
        let currentDateMinutes = moment(fecha).minute();

        let currentDateHours = moment(fecha).hours();
        let currentTime = currentDateHours * 60 + currentDateMinutes;
        let dia = moment(fecha).format("dddd");
        let horarioDate;
        switch (dia) {
          case "Monday":
            horarioDate = horario.monday;
            break;
          case "Tuesday":
            horarioDate = horario.tuesday;
            break;
          case "Wednesday":
            horarioDate = horario.wednesday;
            break;
          case "Thursday":
            horarioDate = horario.thursday;
            break;
          case "Friday":
            horarioDate = horario.friday;
            break;
          case "Saturday":
            horarioDate = horario.saturday;

            break;
          case "Sunday":
            horarioDate = horario.sunday;

            break;
          default:
            horarioDate = 480;
            break;
        }

        // console.log(horarioDate);
        let flagLlegada = false;
        let llegadaMinutes = 0;
        // console.log(currentTime > horarioDate);
        if (currentTime > horarioDate) {
          flagLlegada = true;
          llegadaMinutes = currentTime - horarioDate;
        } else {
          flagLlegada = false;
          llegadaMinutes = 0;
        }
        db.collection("sessions")
          .add({
            user: getters.uid,
            fullname: getters.userFullName,
            tardias: flagLlegada ? 1 : 0,
            grupo: getters.userGrupo,

            AI: {
              flag: false,
              startedAt: null,
              flagAt: null,
              finishedAt: null,
              totalTime: 3600,
              disable: false
            },
            UP: {
              flag: false,
              startedAt: null,
              flagAt: null,
              finishedAt: null,
              totalTime: 0
            },
            CF1: {
              flag: false,
              startedAt: null,
              flagAt: null,
              finishedAt: null,
              totalTime: 900,
              disable: false
            },
            CF2: {
              flag: false,
              startedAt: null,
              flagAt: null,
              finishedAt: null,
              totalTime: 900,
              disable: false
            },

            RS: {
              totalTime: null
            },
            llegada: {
              createdAt: moment(fecha).format(),
              flag: flagLlegada,
              llegadaMinutes: llegadaMinutes
            },
            status: {
              text: "Disponible",
              valor: 0
            }
          })
          .then(
            docRef => {
              dispatch("GUARDAR_SESION", docRef.id).then(() =>
                db
                  .collection("users")
                  .doc(getters.uid)
                  .update({
                    lastSession: moment(fecha).format("MMM Do YY"),
                    lastSessionID: docRef.id,
                    asistencias: increment,
                    tardias: flagLlegada ? 1 : 0
                  })
                  .then(() => {
                    resolve();
                  })
              );
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
            tardias: 0,
            uid: data.user.uid,
            email: register.email,
            fullname: register.fullname,
            level: register.level.state,
            grupo: register.grupo,
            pausas: 0,
            asistencias: 0,
            createdAt: moment(new Date()).format(),
            lastSession: null, // Fecha de la ultima sesión para comparar si tiene o no una sesión hoy
            lastSessionID: null, // Para facilitar traer la información de una sesión ya iniciada hoy
            horario: {
              monday: 480,
              tuesday: 480,
              wednesday: 480,
              thursday: 480,
              friday: 480,
              saturday: 480,
              sunday: 480
            }
          })
          .then(
            () => {},
            error => {
              // console.log(error);
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
                // console.log("No such document!");
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
    userHorario: state => state.user.horario,
    isLoggedIn: state => !!state.user.uid,
    isMaster: state => (state.user.level === "Master" ? true : false),
    isSupervisor: state => (state.user.level === "Supervisor" ? true : false),
    isAgente: state => (state.user.level === "Agente" ? true : false),
    isSessionToday: state =>
      state.user.lastSession == moment().format("MMM Do YY") ? true : false
  }
});

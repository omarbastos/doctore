<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-24">
          <v-toolbar color="#FD9917" dark flat>
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="../assets/logoUC.svg"
              transition="scale-transition"
              width="40"
            />
            <v-toolbar-title class="black--text">Umana Consultants</v-toolbar-title>
          </v-toolbar>
          <v-card v-if="errors && errors.length">
            <v-card-text v-for="(err, index) of errors" :key="index">{{ err }}</v-card-text>
          </v-card>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Usuario"
                name="email"
                v-model="login.email"
                prepend-icon="mdi-account"
                type="email"
              />

              <v-text-field
                id="password"
                label="Contraseña"
                name="password"
                v-model="login.password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="onSubmit" color="#FD9917">Iniciar Sesión</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db, auth } from "../firebase";
import moment from "moment";
export default {
  props: {
    source: String
  },
  data: () => ({
    sessions: [],
    login: {},
    errors: [],
    uid: null
  }),
  firestore() {
    return {};
  },
  methods: {
    onSubmit(ev) {
      ev.preventDefault();
      this.login.email = this.login.email.toLowerCase();

      auth
        .signInWithEmailAndPassword(this.login.email, this.login.password)
        .then(data => {
          this.uid = data.user.uid;
          console.log(`Antes del traer usuario este es el uid ${this.uid}`);

          this.$store.dispatch("TRAER_USUARIO", data.user.uid).then(
            response => {
              if (response.level === "Agente") {
                db.collection("sessions")
                  .add({
                    AI: {
                      flag: false,
                      startedAt: null,
                      flagAt: null,
                      finishedAt: null
                    },
                    UP: {
                      flag: false,
                      flagAt: null,
                      finishedAt: null,
                      totalTime: 10,
                      disable: null
                    },
                    CF1: {
                      flag: false,
                      startedAt: null,
                      flagAt: null,
                      finishedAt: null
                    },
                    CF2: {
                      flag: false,
                      startedAt: null,
                      flagAt: null,
                      finishedAt: null
                    },
                    RS: {
                      totalTime: null
                    },
                    llegada: {
                      createdAt: moment(new Date()).format(
                        "YYYY-MM-DD HH:mm Z"
                      ),
                      flag: false
                    },
                    status: "Disponible",
                    user: db.collection("users").doc(this.uid)
                  })
                  .then(docRef => {
                    console.log(docRef.id);
                    this.$store.dispatch("GUARDAR_SESION", docRef.id);
                    this.$router.push({ name: "Agente" });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                this.$router.push({ name: response.level });
              }
            },
            error => {
              console.error(error);
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>

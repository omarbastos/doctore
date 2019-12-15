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
            <v-toolbar-title class="black--text"
              >Umana Consultants</v-toolbar-title
            >
          </v-toolbar>
          <v-card v-if="errors && errors.length">
            <v-card-text
              class="red--text"
              v-for="(err, index) of errors"
              :key="index"
              >{{ err }}</v-card-text
            >
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
import moment from "moment";

export default {
  props: {
    source: String
  },
  data: () => ({
    sessions: [],
    login: {},
    errors: [],
    uid: null,
    backgroundLoading: "#fd9917"
  }),
  firestore() {
    return {};
  },
  methods: {
    onSubmit(ev) {
      ev.preventDefault();
      this.$vs.loading({
        background: this.backgroundLoading,
        color: "rgb(255, 255, 255)"
      });
      this.login.email = this.login.email.toLowerCase();
      this.$store
        .dispatch("SIGN_IN", this.login)
        .then(data => {
          this.uid = data.user.uid;
          this.$store.dispatch("TRAER_USUARIO", data.user.uid).then(
            response => {
              if (response.level === "Agente") {
                console.log(
                  response.lastSession + "y" + moment().format("MMM Do YY")
                );
                if (!response.lastSession) {
                  // El usuario NUNCA ha iniciado sesión
                  this.$store.dispatch("CREAR_SESION").then(() => {
                    this.$vs.loading.close();
                    this.$router.push({ name: "Agente" });
                  });
                } else if (
                  response.lastSession == moment().format("MMM Do YY")
                ) {
                  // El usuario tiene una sesión cuya fecha es la misma que hoy.
                  // Hay que guardar en el user, lastSession que será la fecha de la última sesión y lastSessionID que será el id para traer las cosas mas rápido
                  // console.log('El usuario ya ha iniciado sesión hoy')

                  this.$store
                    .dispatch("GUARDAR_SESION", response.lastSessionID)
                    .then(() => {
                      console.log(
                        "La sesion es" + this.$store.getters.sesionId
                      );
                      this.$vs.loading.close();
                      this.$router.push({ name: "Agente" });
                    });
                } else {
                  // El usuario ha iniciado sesión antes pero no hoy
                  this.$store.dispatch("CREAR_SESION").then(() => {
                    this.$vs.loading.close();
                    this.$router.push({ name: "Agente" });
                  });
                }
              } else {
                this.$vs.loading.close();
                this.$vs.loading.close();

                this.$router.push({ name: response.level });
              }
            },
            error => {
              console.error(error);
            }
          );
        })
        .catch(err => {
          this.$vs.loading.close();
          this.errors = [err.message];
        });
    }
  }
};
</script>

<style></style>

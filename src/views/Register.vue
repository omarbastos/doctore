<template>
  <v-container class="fill-height" fluid>
    <v-snackbar :timeout="snackbar.timeout" :color="snackbar.color" v-model="snackbar.status">
      {{ snackbar.text }}
      <v-btn color="white" text @click="snackbar.status = false">Close</v-btn>
    </v-snackbar>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-24">
          <v-toolbar color="#FD9917" dark flat>
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="../assets/logo-white.png"
              transition="scale-transition"
              width="40"
            />
            <v-toolbar-title class="black--text">Registrar un nuevo usuario</v-toolbar-title>
          </v-toolbar>
          <v-card v-if="errors && errors.length">
            <v-card-text class="red--text" v-for="(err, index) of errors" :key="index">{{ err }}</v-card-text>
          </v-card>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Usuario"
                name="email"
                v-model="register.email"
                prepend-icon="mdi-account"
                type="text"
              />

              <v-text-field
                v-model="register.password"
                label="Contraseña"
                name="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                hint="At least 6 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-text-field
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, passwordConfirmationRule]"
                :type="show2 ? 'text' : 'password'"
                label="Confirmacion de contraseña"
                hint="At least 6 characters"
                ref="rePassword"
                v-model="rePassword"
                @click:append="show2 = !show2"
              ></v-text-field>

              <v-text-field
                label="Nombre completo"
                name="fullname"
                v-model="register.fullname"
                prepend-icon="mdi-account"
                type="text"
              />

              <v-select
                v-model="register.level"
                hint="Tipo de usuario"
                :items="items"
                item-text="state"
                item-value="abbr"
                label="Select"
                return-object
                single-line
                persistent-hint
                :prepend-icon="register.level.abbr"
              ></v-select>

              <v-select
                v-model="register.grupo"
                hint="Grupo de trabajo"
                :items="listaGrupos"
                item-text="Grupo"
                item-value="abbr"
                label="Select"
                return-object
                single-line
                persistent-hint
                prepend-icon="mdi-account-group"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="onSubmit" color="#FD9917">Registrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { gruposCollection } from "../firebase";
export default {
  props: {
    source: String
  },
  firestore() {
    return { grupos: gruposCollection };
  },
  data: () => ({
    grupos: [],
    errors: [],
    snackbar: {
      timeout: 2000,
      text: "",
      status: false
    },
    show1: false,
    show2: false,
    register: {
      email: "",
      password: "",
      fullname: "",
      level: { state: "Agente", abbr: "mdi-account-circle" }
    },
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 6 || "Min 6 characters"
    },
    rePassword: "",
    items: [
      { state: "Supervisor", abbr: "mdi-account-supervisor-circle" },
      { state: "Agente", abbr: "mdi-account-circle" }
    ],
    groups: ["Turrucares"]
  }),
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.register.password === this.rePassword
          ? false
          : "Password must match";
    },
    listaGrupos() {
      return this.grupos.map(({ nombre }) => nombre);
    }
  },
  methods: {
    onSubmit(ev) {
      ev.preventDefault();
      this.$vs.loading({
        background: "#fd9917",
        color: "rgb(255, 255, 255)"
      });
      this.$store
        .dispatch("CREAR_USUARIO", this.register)
        .then(() => {
          this.$vs.loading.close();
          this.$router.push({ name: "login" });
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

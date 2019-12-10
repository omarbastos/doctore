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
              src="../assets/logoUC.svg"
              transition="scale-transition"
              width="40"
            />
            <v-toolbar-title class="black--text">Registrar un nuevo usuario</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Usuario"
                name="username"
                v-model="register.username"
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
                :items="groups"
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
export default {
  props: {
    source: String
  },
  data: () => ({
    snackbar: {
      timeout: 2000,
      text: "",
      status: false
    },
    show1: false,
    show2: false,
    register: {
      username: "",
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
      { state: "Master", abbr: "mdi-account-tie" },
      { state: "Agente", abbr: "mdi-account-circle" }
    ],
    groups: ["La Nacion", "Cobros Tigo", "Claro"]
  }),
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.register.password === this.rePassword
          ? false
          : "Password must match";
    }
  },
  methods: {
    onSubmit(ev) {
      ev.preventDefault();
      this.register.username = this.register.username.toLowerCase();
      this.register.level = this.register.level.state;
      this.register.createdAt = new Date();
      if (this.register.password === this.rePassword) {
        this.$store
          .dispatch("register", this.register)
          .then(() => {
            this.snackbar.color = "success";
            this.snackbar.text = "Registro exitoso";
            this.snackbar.status = true;
            setTimeout(
              () =>
                this.$router.push({
                  name: "login"
                }),
              2000
            );
          })
          .catch(err => {
            this.errors = [err.response.data.err];
            this.register.password = "";
            this.rePassword = "";
            this.register.level = {
              state: "Agente",
              abbr: "mdi-account-circle"
            };
          });

        /* // Registro seguro con Axios puro
        axios
          .post("http://localhost:3000/api/auth/register/", this.register)
          .then(() => {
            this.snackbar.color = "success";
            this.snackbar.text = "Registro exitoso";
            this.snackbar.status = true;
            setTimeout(
              () =>
                this.$router.push({
                  name: "login"
                }),
              2000
            );
          })
          .catch(err => {
            this.errors = [err.response.data.err]
          });*/
      } else {
        this.snackbar.color = "error";
        this.snackbar.text = "La confirmación de la contraseña debe coincidir";
        this.snackbar.status = true;
      }
    }
  }
};
</script>

<style></style>

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
            <v-toolbar-title class="black--text "
              >Umana Consultants</v-toolbar-title
            >
          </v-toolbar>
          <v-card v-if="errors && errors.length">
            <v-card-text v-for="(err, index) of errors" :key="index">
              {{ err }}
            </v-card-text>
          </v-card>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Usuario"
                name="username"
                v-model="login.username"
                prepend-icon="mdi-account"
                type="text"
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
export default {
  props: {
    source: String
  },
  data: () => ({
    login: {},
    errors: []
  }),
  methods: {
    onSubmit(ev) {
      ev.preventDefault();
      this.$store
        .dispatch("login", this.login)
        .then(res =>
          this.$router.push({
            name: res.data.user.level
          })
        )
        .catch(err => console.log(err));
    },
    register() {
      this.$router.push({
        name: "register"
      });
    }
  }
};
</script>

<style></style>

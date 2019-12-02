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
          <v-card-text>
            <v-form>
              <v-text-field
                label="Usuario"
                name="username"
                v-model="username"
                prepend-icon="mdi-account"
                type="text"
              />

              <v-text-field
                id="password"
                label="Contraseña"
                name="password"
                v-model="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="#FD9917">Iniciar Sesión</v-btn>
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
    username: "",
    password: ""
  })
};
</script>

<style></style>

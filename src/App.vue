<template>
  <v-app>
    <v-app-bar app color="#FD9917">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logoUC.svg"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title class="titulo-pagina">Doctore</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-toolbar-title class="hidden-sm-and-down">
        <!-- <span :class="usernameIcon"></span> -->
      </v-toolbar-title>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list dark>
          <v-list-item @click="logout()">
            <v-list-item-title>
              Logout
              <span class="mdi mdi-logout"></span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content class="align-center d-flex">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { auth } from "./firebase";

export default {
  name: "App",
  components: {},

  data: () => ({}),
  computed: {},
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$store.commit("LOGOUT");
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Merienda+One&display=swap');

.titulo-pagina {
  font-size: 2rem !important;
}

.v-content {
  background: #ECE9E6; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>

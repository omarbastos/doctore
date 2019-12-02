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
        <v-toolbar-title class="titulo-pagina">Doctore </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-toolbar-title
        >{{ username }}
        <span class="mdi mdi-account-circle"></span>
      </v-toolbar-title>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list dark>
          <v-list-item>
            <v-list-item-title>Option 1</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Option 2</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Option 3</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content class=" align-center d-flex">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},

  data: () => ({
    username: "Daniel Umana"
  })
};
</script>

<style lang="stylus">


@import url('https://fonts.googleapis.com/css?family=Merienda+One&display=swap');


.titulo-pagina{
font-family: 'Merienda One', cursive;
font-size 2rem !important
}

.v-content{
background: #232526;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <uc-reloj :sec="up" @end="alertando"></uc-reloj>
  </div>
</template>

<script>
// @ is an alias to /src
import UcReloj from "../components/UcReloj.vue";
export default {
  name: "home",
  data: () => ({}),
  components: { UcReloj },
  methods: {
    alertando() {
      alert("Up finalizado");
    }
  }
};
</script>

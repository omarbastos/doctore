<template>
  <div class="agente my-4">
    <div class="row">
      <div :class="classUp">
        <up-reloj
          @up-pause="pauseUp"
          @up-start="startUp"
          @up-ended="flagUp"
        ></up-reloj>
      </div>
      <div :class="classHora">
        <div class="display-1 white--text text-center">
          <span class="llegada">HORA DE LLEGADA</span>
          <div class="timer">
            <span id="minutes">{{ hours }}</span>
            <span id="middle">:</span>
            <span id="seconds">{{ minutes }}</span> AM
          </div>
        </div>
      </div>
      <div :class="classRs">
        <rs-reloj @rs-stop="stopRs" @rs-start="startRs"></rs-reloj>
      </div>
      <div :class="classCf1">
        <cf1-reloj
          @cafe1-stop="stopCafe1"
          @cafe1-start="startCafe1"
          @cf1-ended="flagCf1"
        ></cf1-reloj>
      </div>

      <div :class="classAi">
        <ai-reloj
          @ai-start="startAi"
          @ai-stop="stopAi"
          @ai-ended="flagAi"
        ></ai-reloj>
      </div>
      <div :class="classCf2">
        <cf2-reloj
          @cafe2-stop="stopCafe2"
          @cafe2-start="startCafe2"
          @cf2-ended="flagCf2"
        ></cf2-reloj>
      </div>
    </div>
    <v-footer class="footer" dark>
      <marquee-text :repeat="4">
        <div class="mx-4 font-italic">
          <span class="boss mx-2 font-weight-bold">{{ groupLeader }}</span>
          "{{ difusion }}".
        </div>
      </marquee-text>
    </v-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import UpReloj from "../components/UpReloj.vue";
import AiReloj from "../components/AiReloj.vue";
import Cf1Reloj from "../components/Cf1Reloj.vue";
import Cf2Reloj from "../components/Cf2Reloj.vue";
import RsReloj from "../components/RsReloj.vue";

export default {
  name: "home",
  data: () => ({
    username: "D.Umana",
    groupLeader: "Luis Gonzalez",
    difusion: "Lunes 2 de Diciembre: descuento del 2x1 en revista El Catolico",
    classUp: "col-md-4 d-flex align-center justify-center ",
    classCf1: "col-md-4 d-flex align-center justify-center",
    classCf2: "col-md-4 d-flex align-center justify-center",
    classRs: "col-md-4 d-flex align-center justify-center",
    classAi: "col-md-4 d-flex align-center justify-center",
    classHora: "col-md-4 d-flex align-center justify-center",
    hours: "08",
    minutes: "20",
    secSelected: 1200
  }),
  components: { UpReloj, AiReloj, Cf1Reloj, Cf2Reloj, RsReloj },
  methods: {
    flagUp() {
      //Guardar en la base de datos que se comio el UP
      alert("Up finalizado");
    },
    flagAi() {
      //Guardar en la base de datos que se comio el UP
      alert("Ai finalizado");
    },

    flagCf2() {
      //Guardar en la base de datos que se comio el UP
      alert("cf2 finalizado");
    },

    flagCf1() {
      //Guardar en la base de datos que se comio el UP
      alert("cf1 finalizado");
    },
    pauseUp() {
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startUp() {
      this.classUp = "col-md-12 d-flex align-center justify-center";
      this.classCf1 = "hidden";
      this.classCf2 = "hidden";
      this.classRs = "hidden";
      this.classAi = "hidden";
      this.classHora = "hidden";
    },
    stopAi() {
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startAi() {
      this.classUp = "hidden";
      this.classCf1 = "hidden";
      this.classCf2 = "hidden";
      this.classRs = "hidden";
      this.classAi = "col-md-12 d-flex align-center justify-center";
      this.classHora = "hidden";
    },
    stopRs() {
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startRs() {
      this.classUp = "hidden";
      this.classCf1 = "hidden";
      this.classCf2 = "hidden";
      this.classRs = "col-md-12 d-flex align-center justify-center";
      this.classAi = "hidden";
      this.classHora = "hidden";
    },
    stopCafe1() {
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startCafe1() {
      this.classUp = "hidden";
      this.classCf1 = "col-md-12 d-flex align-center justify-center";
      this.classCf2 = "hidden";
      this.classRs = "hidden";
      this.classAi = "hidden";
      this.classHora = "hidden";
    },
    stopCafe2() {
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startCafe2() {
      this.classUp = "hidden";
      this.classCf1 = "hidden";
      this.classCf2 = "col-md-12 d-flex align-center justify-center";
      this.classRs = "hidden";
      this.classAi = "hidden";
      this.classHora = "hidden";
    }
  }
};
</script>

<style lang="stylus">

@font-face {
  font-family: 'digital-7';
  src: url('../assets/digital-7.ttf');
}

.hidden {
  display: none;
}

.footer{
  position:fixed !important
  bottom:0px

}
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #949698 !important;
}
.timer {
  font-size: 3.5rem;
  line-height: 1;
  margin-bottom: 40px;
  padding: 15px;
  font-family: 'digital-7', sans-serif;
  color: black;
}

.responsive-tabla {
  height: 40vh;
  overflow-y: scroll;
  border-radius: 5px;
}

.outer {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  overflow: hidden;
}

span.time {
  font-size: 10px;
  padding: 5px;
  background-color: blue;
  border-radius: 15px;
  font-weight: 500;
  font-style: italic;
}

span.llegada {
  padding: 10px;
  background-color: #fd9917;
  border-radius: 7px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

span.boss {
  padding: 10px;
  background-color: red;
  border-radius: 25px;
}

h2 {
}
</style>

<template>
  <div class="agente my-4">
    <v-snackbar top :timeout="snackbar.timeout" :color="snackbar.color" v-model="snackbar.status">
      {{ snackbar.text }}
      <v-btn color="white" text @click="snackbar.status = false">Close</v-btn>
    </v-snackbar>
    <div class="row">
      <div :class="classUp">
        <up-reloj
          :fbTotalTime="session.UP.totalTime"
          :disable="session.UP.disable || session.UP.flag"
          :upText="upText"
          @up-pause="pauseUp"
          @up-start="startUp"
          @up-ended="flagUp"
        ></up-reloj>
      </div>
      <div :class="classHora">
        <!-- <div class="display-1 white--text text-center">
          <span class="llegada">HORA DE LLEGADA</span>
          <div class="timer">
            <span id="minutes">{{ hours }}</span>
            <span id="middle">:</span>
            <span id="seconds">{{ minutes }}</span> AM
          </div>
        </div>-->

        <!-- <div>
          <input type="text" v-model="newReptile" @keyup.enter="addReptile" />
          <button @click="addReptile">
            Add Reptile
          </button>
        </div>
        <ul class="reptileList">
          <li :key="index" v-for="(reptile, index) in reptiles">
            {{ reptile.name }} -
            <button @click="deleteReptile(reptile)">
              Remove
            </button>
          </li>
        </ul>-->
      </div>
      <div :class="classRs">
        <rs-reloj @rs-stop="stopRs" @rs-start="startRs"></rs-reloj>
      </div>
      <div :class="classCf1">
        <cf1-reloj
          :cf2Text="cf2Text"
          @cafe1-stop="stopCafe1"
          @cafe1-start="startCafe1"
          @cf1-ended="flagCf1"
        ></cf1-reloj>
      </div>

      <div :class="classAi">
        <ai-reloj :aiText="aiText" @ai-start="startAi" @ai-stop="stopAi" @ai-ended="flagAi"></ai-reloj>
      </div>
      <div :class="classCf2">
        <cf2-reloj
          :cf2Text="cf2Text"
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
import moment from "moment";
import { sessionsCollection, increment } from "../firebase";
export default {
  name: "home",

  data: () => ({
    sessions: [],
    session: {
      UP: {
        totalTime: 10,
        disable: false,
        flag: false
      }
    },
    snackbar: {
      timeout: 9999999,
      text: "",
      status: false
    },
    aiText: "Detener Almuerzo",
    cf1Text: "Detener Coffe",
    cf2Text: "Detener Coffe",
    upText: "Detener Uso Personal",
    newReptile: "",
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
  firestore() {
    return {
      sessions: sessionsCollection,
      session: sessionsCollection.doc(this.docKey)
    };
  },
  computed: {
    docKey() {
      return this.$store.getters.sesionId;
    }
  },

  components: { UpReloj, AiReloj, Cf1Reloj, Cf2Reloj, RsReloj },
  methods: {
    flagUp(totalTime) {
      this.$firestore.sessions.doc(this.docKey).update({
        "UP.flag": true,
        "UP.flagAt": moment(new Date()).format("YYYY-MM-DD HH:mm Z"),
        "UP.disable": true,
        "UP.totalTime": totalTime,
        tardias: increment
      });
      this.pauseUp(totalTime);
    },
    flagAi() {
      //Guardar en la base de datos que se comio el UP
      this.$firestore.sessions
        .doc(this.docKey)
        .update({
          "AI.flag": true,
          "AI.flagAt": moment(new Date()).format("YYYY-MM-DD HH:mm Z"),
          tardias: increment
        })
        .then(() => {
          this.aiText = "TARDIA POR ALMUERZO";
        });
    },

    flagCf2() {
      this.$firestore.sessions
        .doc(this.docKey)
        .update({
          "CF2.flag": true,
          "CF2.flagAt": moment(new Date()).format("YYYY-MM-DD HH:mm Z"),
          tardias: increment
        })
        .then(() => {
          this.cf2Text = "TARDIA POR CAFE2";
        });
    },

    flagCf1() {
      this.$firestore.sessions
        .doc(this.docKey)
        .update({
          "CF1.flag": true,
          "CF1.flagAt": moment(new Date()).format("YYYY-MM-DD HH:mm Z"),
          tardias: increment
        })
        .then(() => {
          this.cf1Text = "TARDIA POR CAFE1";
        });
    },
    pauseUp(totalTime) {
      this.$firestore.sessions.doc(this.docKey).update({
        "UP.finishedAt": moment(new Date()).format("YYYY-MM-DD HH:mm Z"),
        "UP.totalTime": totalTime,
        "status.text": "Disponible",
        "status.valor": 0
      });

      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startUp(totalTime) {
      this.$firestore.sessions.doc(this.docKey).update({
        "status.text": "Uso Personal",
        "status.valor": 2,
        "UP.totalTime": totalTime
      });

      this.classUp = "col-md-12 d-flex align-center justify-center";
      this.classCf1 = "hidden";
      this.classCf2 = "hidden";
      this.classRs = "hidden";
      this.classAi = "hidden";
      this.classHora = "hidden";
    },
    stopAi() {
      this.$firestore.sessions.doc(this.docKey).update({
        "AI.finishedAt": moment(new Date()).format("YYYY-MM-DD HH:mm Z"),
        "status.text": "Disponible",

        "status.valor": 0
      });
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startAi() {
      this.$firestore.sessions.doc(this.docKey).update({
        "AI.startedAt": moment(new Date()).format("YYYY-MM-DD HH:mm Z"),
        "status.text": "En Almuerzo",
        "status.valor": 4
      });
      this.classUp = "hidden";
      this.classCf1 = "hidden";
      this.classCf2 = "hidden";
      this.classRs = "hidden";
      this.classAi = "col-md-12 d-flex align-center justify-center";
      this.classHora = "hidden";
    },
    stopRs(totalTime) {
      this.$firestore.sessions.doc(this.docKey).update({
        "status.text": "Disponible",

        "status.valor": 0,
        "RS.totalTime": totalTime
      });
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startRs() {
      this.$firestore.sessions.doc(this.docKey).update({
        "status.text": "Reunion con Supervisor",
        "status.valor": 3
      });
      this.classUp = "hidden";
      this.classCf1 = "hidden";
      this.classCf2 = "hidden";
      this.classRs = "col-md-12 d-flex align-center justify-center";
      this.classAi = "hidden";
      this.classHora = "hidden";
    },
    stopCafe1() {
      this.$firestore.sessions.doc(this.docKey).update({
        "CF1.finishedAt": moment(new Date()).format("YYYY-MM-DD HH:mm Z"),
        "status.text": "Disponible",
        "status.valor": 0
      });
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startCafe1() {
      this.$firestore.sessions.doc(this.docKey).update({
        "CF1.startedAt": moment(new Date()).format("YYYY-MM-DD HH:mm Z"),
        "status.text": "En Café",
        "status.valor": 1
      });
      this.classUp = "hidden";
      this.classCf1 = "col-md-12 d-flex align-center justify-center";
      this.classCf2 = "hidden";
      this.classRs = "hidden";
      this.classAi = "hidden";
      this.classHora = "hidden";
    },
    stopCafe2() {
      this.$firestore.sessions.doc(this.docKey).update({
        "CF2.finishedAt": moment(new Date()).format("YYYY-MM-DD HH:mm Z"),
        "status.text": "Disponible",
        "status.valor": 0
      });
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startCafe2() {
      this.$firestore.sessions.doc(this.docKey).update({
        "CF2.startedAt": moment(new Date()).format("YYYY-MM-DD HH:mm Z"),
        "status.text": "En Café",
        "status.valor": 1
      });
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

.footer {
  position: fixed !important;
  bottom: 0px;
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

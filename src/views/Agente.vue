<template>
  <div class="agente my-4">
    <v-snackbar
      top
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      v-model="snackbar.status"
    >
      {{ snackbar.text }}
      <v-btn color="white" text @click="snackbar.status = false">Close</v-btn>
    </v-snackbar>
    <div class="row">
      <div :class="classUp">
        <up-reloj
          :fbTotalTime="session.UP.totalTime"
          @up-stop="pauseUp"
          @up-start="startUp"
          @up-ended="flagUp"
          :flag="session.UP.flag"
        ></up-reloj>
      </div>
      <div :class="classAi">
        <ai-reloj
          :fbTotalTime="session.AI.totalTime"
          :disable="session.AI.disable"
          :aiText="aiText"
          @ai-start="startAi"
          @ai-stop="stopAi"
          @ai-ended="flagAi"
        ></ai-reloj>
      </div>
      <div :class="classRs">
        <rs-reloj
          :fbTotalTime="session.RS.totalTime"
          @rs-stop="stopRs"
          @rs-start="startRs"
        ></rs-reloj>
      </div>
      <div :class="classCf1">
        <cf1-reloj
          :disable="session.CF1.disable"
          :fbTotalTime="session.CF1.totalTime"
          :cf2Text="cf2Text"
          @cafe1-stop="stopCafe1"
          @cafe1-start="startCafe1"
          @cf1-ended="flagCf1"
        ></cf1-reloj>
      </div>
      <div :class="classHora">
        <div class="container chat">
          <h2 class="text-primary text-center">Team {{ userGrupo }}</h2>
          <v-divider></v-divider>
          <div class="card">
            <div class="card-body">
              <p class="text-secondary nomessages" v-if="messages.length == 0">
                [No messages yet!]
              </p>
              <div
                class="messages"
                v-chat-scroll="{ always: false, smooth: true }"
              >
                <div v-for="message in messages" :key="message.id">
                  <v-chip class="ma-2" color="#fd9917">{{
                    message.name
                  }}</v-chip
                  ><br />
                  <span>{{ message.message }}</span>
                  <br />
                  <v-chip class="float-right  peque " outlined>{{
                    message.timestamp
                  }}</v-chip>
                  <br />
                </div>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="card-action">
              <CreateMessage
                :grupo="userGrupo"
                :name="$store.getters.userFullName"
              />
            </div>
          </div>
        </div>
      </div>

      <div :class="classCf2">
        <cf2-reloj
          :fbTotalTime="session.CF2.totalTime"
          :disable="session.CF2.disable"
          :cf2Text="cf2Text"
          @cafe2-stop="stopCafe2"
          @cafe2-start="startCafe2"
          @cf2-ended="flagCf2"
        ></cf2-reloj>
      </div>
    </div>
    <!-- <v-footer class="footer" dark>
      <marquee-text :repeat="4">
        <div class="mx-4 font-italic">
          <span class="boss mx-2 font-weight-bold">{{ groupLeader }}</span>
          "{{ difusion }}".
        </div>
      </marquee-text>
    </v-footer> -->
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
import CreateMessage from "@/components/CreateMessage";
import { db,usersCollection, sessionsCollection, increment } from "../firebase";

export default {
  props: {
    fbTotalTime: Number
  },
  name: "home",

  data: () => ({
    messages: [],
    sessions: [],
    user:[],
    session: {},
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
    groupLeader: "Daniel",
    difusion: "Aqui va un mensaje personalizado del supervisor al grupo",
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
        user: usersCollection.doc(this.$store.getters.uid),
      sessions: sessionsCollection,
      session: sessionsCollection.doc(this.docKey)
    };
  },

  computed: {
    docKey() {
      return this.$store.getters.sesionId;
    },
    userGrupo() {
      return this.$store.getters.userGrupo;
    }
  },
  created() {
    let ref = db.collection(this.userGrupo).orderBy("timestamp");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LTS")
          });
        }
      });
    });
  },

  components: { UpReloj, AiReloj, Cf1Reloj, Cf2Reloj, RsReloj, CreateMessage },
  methods: {
    flagUp(totalTime) {
      this.$firestore.sessions
        .doc(this.docKey)
        .update({
          "UP.flag": true,
          "UP.flagAt": moment(new Date()).format(),
          "UP.disable": true,
          "UP.totalTime": totalTime,
          tardias: increment
        })
        .then(() => this.pauseUp(totalTime));
        this.$firestore.user
          .update({
              tardias: increment
          })
    },
    flagAi(totalTime) {
      //Guardar en la base de datos que se comio el UP
      this.$firestore.sessions
        .doc(this.docKey)
        .update({
          "AI.flag": true,
          "AI.flagAt": moment(new Date()).format(),
          "AI.totalTime": totalTime,
          tardias: increment
        })
        .then(() => {
          this.aiText = "TARDIA POR ALMUERZO";
        });
        this.$firestore.user
          .update({
              tardias: increment
          })
    },

    flagCf2(totaltime) {
      this.$firestore.sessions
        .doc(this.docKey)
        .update({
          "CF2.flag": true,
          "CF2.flagAt": moment(new Date()).format(),
          "CF2.totaltime": totaltime,
          tardias: increment
        })
        .then(() => {
          this.cf2Text = "TARDIA POR CAFE2";
        });
        this.$firestore.user
          .update({
              tardias: increment
          })
    },

    flagCf1(totalTime) {
      this.$firestore.sessions
        .doc(this.docKey)
        .update({
          "CF1.flag": true,
          "CF1.flagAt": moment(new Date()).format(),
          "CF1.totalTime": totalTime,
          tardias: increment
        })
        .then(() => {
          this.cf1Text = "TARDIA POR CAFE1";
        });
        this.$firestore.user
          .update({
              tardias: increment
          })
    },
    pauseUp(totalTime) {
      this.$firestore.sessions.doc(this.docKey).update({
        "UP.finishedAt": moment(new Date()).format(),
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
    stopAi(totalTime) {
      this.$firestore.sessions.doc(this.docKey).update({
        "AI.finishedAt": moment(new Date()).format(),
        "status.text": "Disponible",
        "status.valor": 0,
        "AI.totalTime": totalTime,
        "AI.disable": true
      });
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startAi(totalTime) {
      this.$firestore.sessions.doc(this.docKey).update({
        "AI.startedAt": moment(new Date()).format(),
        "status.text": "En Almuerzo",
        "status.valor": 4,

        "AI.totalTime": totalTime
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
    stopCafe1(totalTime) {
      this.$firestore.sessions.doc(this.docKey).update({
        "CF1.finishedAt": moment(new Date()).format(),
        "status.text": "Disponible",
        "status.valor": 0,
        "CF1.totalTime": totalTime,
        "CF1.disable": true
      });
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startCafe1(totalTime) {
      this.$firestore.sessions.doc(this.docKey).update({
        "CF1.startedAt": moment(new Date()).format(),
        "status.text": "En Café",
        "status.valor": 1,

        "CF1.totalTime": totalTime
      });
      this.classUp = "hidden";
      this.classCf1 = "col-md-12 d-flex align-center justify-center";
      this.classCf2 = "hidden";
      this.classRs = "hidden";
      this.classAi = "hidden";
      this.classHora = "hidden";
    },
    stopCafe2(totalTime) {
      this.$firestore.sessions.doc(this.docKey).update({
        "CF2.finishedAt": moment(new Date()).format(),
        "status.text": "Disponible",
        "status.valor": 0,
        "CF2.totalTime": totalTime,
        "CF2.disable": true
      });
      this.classUp = "col-md-4 d-flex align-center justify-center";
      this.classCf1 = "col-md-4 d-flex align-center justify-center";
      this.classCf2 = "col-md-4 d-flex align-center justify-center";
      this.classRs = "col-md-4 d-flex align-center justify-center";
      this.classAi = "col-md-4 d-flex align-center justify-center";
      this.classHora = "col-md-4 d-flex align-center justify-center";
    },
    startCafe2(totalTime) {
      this.$firestore.sessions.doc(this.docKey).update({
        "CF2.startedAt": moment(new Date()).format(),
        "status.text": "En Café",
        "status.valor": 1,

        "CF2.totalTime": totalTime
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
.peque{
  font-size: 8px !important
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
.chat h2{
    font-size: 2.6em;
    margin-bottom: 0px;
}
.chat h5{
    margin-top: 0px;
    margin-bottom: 40px;
}
.chat span{
    font-size: 1.2em;
}
.chat .time{
    display: block;
    font-size: 0.7em;
}
.messages{
    max-height: 300px;
    overflow: auto;
}
</style>

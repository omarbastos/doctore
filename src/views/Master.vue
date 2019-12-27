<template>
  <div>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <v-btn color="orange" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-container v-if="!showGrupo" class="col-md-6" elevation="24">
      <v-row justify="center" align="center">
        <v-col cols="8">
          <v-subheader>Grupos de Trabajo de Umana Consultants</v-subheader>
          <v-select
            v-model="grupoElegido"
            :items="listaGrupos"
            menu-props="auto"
            color="#fd9917"
            hint="Seleccione un Grupo de Trabajo"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-btn @click="seleccionarGrupo" block color="success">
            <v-icon dark>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn @click="crearGrupo" dark block color="red">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <users-table></users-table>
    </v-container>

    <v-container v-if="showNewGrupo">
      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            label="Crear nuevo grupo de trabajo"
            outlined
            v-model="newGrupo"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn @click="enviarGrupo" block dark color="red">CREAR</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="showGrupo">
      <v-row justify="center" align="center" v-if="!showHistorico">
        <v-col>
          <div class="container chat">
            <h2 class="text-primary text-center">Team {{ grupoTrabajo }}</h2>
            <v-divider></v-divider>
            <div class="card">
              <div class="card-body">
                <p
                  class="text-secondary nomessages"
                  v-if="messages.length == 0"
                >
                  [No messages yet!]
                </p>
                <div
                  class="messages"
                  v-chat-scroll="{ always: false, smooth: true }"
                >
                  <div v-for="message in messages" :key="message.id">
                    <v-chip class="ma-2" color="#fd9917">
                      {{ message.name }}
                    </v-chip>
                    <br />
                    <span>{{ message.message }}</span>
                    <br />
                    <v-chip class="float-right peque" outlined>
                      {{ message.timestamp }}
                    </v-chip>
                    <br />
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="card-action">
                <CreateMessage
                  :grupo="grupoTrabajo"
                  :name="$store.getters.userFullName"
                />
              </div>
            </div>
          </div>
        </v-col>
        <v-col>
          <resumen-disponibilidad
            :series="series"
            data-aos="zoom-in"
          ></resumen-disponibilidad>
        </v-col>
      </v-row>

      <historico-llegada
        data-aos="zoom-in"
        @close-historico="hideHistorico"
        :agent="temporalAgent"
        v-if="showHistorico"
      ></historico-llegada>
      <agent-table
        :sessions="sessionesFiltradas"
        data-aos="zoom-in"
        @agent-selected="agentSelected"
        v-else
      ></agent-table>
      <v-btn
        v-show="!showHistorico"
        @click="seleccionarGrupo"
        color="error"
        fab
        large
        dark
        right
        bottom
        fixed
        class="v-btn--example"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { db, gruposCollection, sessionsCollection } from "../firebase";
import CreateMessage from "@/components/CreateMessage";
import moment from "moment";
import AgentTable from "../components/AgentTable.vue";
import ResumenDisponibilidad from "../components/ResumenDisponibilidad.vue";
import HistoricoLlegada from "../components/HistoricoLlegada.vue";
import UsersTable from "../components/UsersTable.vue";

export default {
  components: {
    AgentTable,
    ResumenDisponibilidad,
    HistoricoLlegada,
    CreateMessage,
    UsersTable
  },
  firestore() {
    return {
      grupos: gruposCollection,
      sessions: sessionsCollection.where(
        "llegada.createdAt",
        ">=",
        moment(new Date()).format("YYYY-MM-DD")
      ),
      messages: db.collection(this.grupoTrabajo).orderBy("timestamp")
    };
  },
  data: () => ({
    showNewGrupo: false,
    showGrupo: false,
    text: "",
    snackbar: false,
    grupoElegido: "La Nación",
    newGrupo: null,
    grupos: {},
    sessions: [],
    messages: [],
    showHistorico: false,
    temporalAgent: null
  }),
  computed: {
    listaGrupos() {
      return this.grupos.map(({ nombre }) => nombre);
    },
    grupoTrabajo() {
      return this.grupoElegido;
    },
    sessionesFiltradas() {
      let self = this;
      return self.sessions.filter(function(session) {
        return session.grupo === self.grupoElegido;
      });
    },
    series() {
      var result = this.sessionesFiltradas.map(({ status }) => status.valor);
      var on = 0;
      var up = 0;
      var cf = 0;
      var ai = 0;
      var rs = 0;
      var off = 0;
      for (var i = 0; i < result.length; ++i) {
        switch (result[i]) {
          case 0:
            on++;
            break;
          case 1:
            cf++;
            break;
          case 2:
            up++;
            break;
          case 3:
            rs++;
            break;
          case 4:
            ai++;
            break;
          case 5:
            off++;
            break;
          default:
            break;
        }
      }
      var series = [on, up, cf, ai, rs, off];
      return series;
    }
  },
  methods: {
    agentSelected(payload) {
      this.temporalAgent = payload;
      this.showHistorico = true;
    },
    hideHistorico() {
      this.showHistorico = false;
    },
    seleccionarGrupo() {
      this.showGrupo = !this.showGrupo;
      this.showNewGrupo = false;
    },
    crearGrupo() {
      this.showNewGrupo = !this.showNewGrupo;
    },
    enviarGrupo() {
      this.$firestore.grupos
        .add({
          nombre: this.newGrupo
        })
        .then(() => {
          this.text = "Se ha creado el grupo con exito";
          this.snackbar = true;
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

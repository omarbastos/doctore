<template>
  <div>
    <historico-llegada
      data-aos="zoom-in"
      @close-historico="hideHistorico"
      :agent="temporalAgent"
      v-if="showHistorico"
    ></historico-llegada>
    <div v-else class>
      <v-expansion-panels style="margin-top:20px" popout>
        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            Chat del Team
            <template v-slot:actions>
              <v-icon color="orange">mdi-forum</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
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
                      >[No messages yet!]</p>
                      <div class="messages" v-chat-scroll="{ always: false, smooth: true }">
                        <div v-for="message in messages" :key="message.id">
                          <v-chip class="ma-2" color="#fd9917">
                            {{
                            message.name
                            }}
                          </v-chip>
                          <br />
                          <span>{{ message.message }}</span>
                          <br />
                          <v-chip class="float-right peque" outlined>
                            {{
                            message.timestamp
                            }}
                          </v-chip>
                          <br />
                        </div>
                      </div>
                    </div>
                    <v-divider></v-divider>
                    <div class="card-action">
                      <CreateMessage :grupo="grupoTrabajo" :name="$store.getters.userFullName" />
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            Lista de Usuarios del Grupo
            <template v-slot:actions>
              <v-icon color="orange">mdi-account-group</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <users-supervisor @user-selected="agentfromData"></users-supervisor>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-row v-if="!showHistorico">
      <v-col>
        <resumen-disponibilidad :series="series" data-aos="zoom-in"></resumen-disponibilidad>
      </v-col>
      <v-col>
        <agent-table
          :sessions="sessionesFiltradas"
          data-aos="zoom-in"
          @agent-selected="agentSelected"
        ></agent-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { db, sessionsCollection } from "../firebase";
import CreateMessage from "@/components/CreateMessage";
import moment from "moment";
import AgentTable from "../components/AgentTable.vue";
import ResumenDisponibilidad from "../components/ResumenDisponibilidad.vue";
import HistoricoLlegada from "../components/HistoricoLlegada.vue";
import store from "../store";
import UsersSupervisor from "../components/UsersSupervisor.vue";
export default {
  components: {
    AgentTable,
    ResumenDisponibilidad,
    HistoricoLlegada,
    CreateMessage,
    UsersSupervisor
  },
  firestore() {
    return {
      sessions: sessionsCollection.where(
        "llegada.createdAt",
        ">=",
        moment(new Date()).format("YYYY-MM-DD")
      )
    };
  },
  data: () => ({
    sessions: [],
    messages: [],
    showHistorico: false,
    temporalAgent: {
      user: null
    }
  }),
  computed: {
    grupoTrabajo() {
      return store.getters.userGrupo;
    },
    sessionesFiltradas() {
      return this.sessions.filter(function(session) {
        return session.grupo === store.getters.userGrupo;
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
    agentfromData(payload) {
      this.temporalAgent.user = payload.uid;
      this.showHistorico = true;
    },
    hideHistorico() {
      this.showHistorico = false;
    }
  },
  created() {
    let ref = db.collection(this.grupoTrabajo).orderBy("timestamp");
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
  }
};
</script>

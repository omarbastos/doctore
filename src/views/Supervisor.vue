<template>
  <div>
    <h1 class="text-center display-2 my-4">{{ grupoTrabajo }}</h1>
    <resumen-disponibilidad :series="series" data-aos="zoom-in" v-if="!showHistorico"></resumen-disponibilidad>
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
  </div>
</template>

<script>
import { sessionsCollection } from "../firebase";
import moment from "moment";
import AgentTable from "../components/AgentTable.vue";
import ResumenDisponibilidad from "../components/ResumenDisponibilidad.vue";
import HistoricoLlegada from "../components/HistoricoLlegada.vue";
import store from "../store";
export default {
  components: {
    AgentTable,
    ResumenDisponibilidad,
    HistoricoLlegada
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
    showHistorico: false,
    temporalAgent: null
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
    hideHistorico() {
      this.showHistorico = false;
    }
  }
};
</script>

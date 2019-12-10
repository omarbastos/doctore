<template>
  <div>
    <h1 class="text-center display-2 my-4">{{ grupoTrabajo }}</h1>
    <resumen-disponibilidad
      :series="series"
      data-aos="zoom-in"
      v-if="!showHistorico"
    ></resumen-disponibilidad>
    <historico-llegada
      data-aos="zoom-in"
      @close-historico="hideHistorico"
      :agent="temporalAgent"
      v-if="showHistorico"
    ></historico-llegada>
    <agent-table
      data-aos="zoom-in"
      @agent-selected="agentSelected"
      v-else
    ></agent-table>
  </div>
</template>

<script>
import AgentTable from "../components/AgentTable.vue";
import ResumenDisponibilidad from "../components/ResumenDisponibilidad.vue";
import HistoricoLlegada from "../components/HistoricoLlegada.vue";
export default {
  components: {
    AgentTable,
    ResumenDisponibilidad,
    HistoricoLlegada
  },
  data: () => ({
    series: [7, 1, 0, 0, 1],
    showHistorico: false,
    temporalAgent: null
  }),
  computed: {
    grupoTrabajo() {
      return this.$store.getters.userGrupo;
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

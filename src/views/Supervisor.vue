<template>
  <div>
    <resumen-disponibilidad></resumen-disponibilidad>
    <historico-llegada></historico-llegada>
    <agent-table></agent-table>
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
  }
};
</script>

<style></style>

<template>
  <div>
    <resumen-disponibilidad></resumen-disponibilidad>
    <agent-table></agent-table>
  </div>
</template>

<script>
import AgentTable from "../components/AgentTable.vue";
import ResumenDisponibilidad from "../components/ResumenDisponibilidad.vue";
export default {
  components: {
    AgentTable,
    ResumenDisponibilidad
  }
};
</script>

<style></style>

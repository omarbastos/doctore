<template>
  <v-simple-table dark>
    <template v-slot:default>
      <thead class="naranja">
        <tr>
          <th class="black--text text-center font-weight-bold">AGENTE</th>
          <th class="black--text text-center font-weight-bold">ESTATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Agentes" :key="item.agente">
          <td class="text-center font-weight-medium">{{ item.agente }}</td>
          <td class="text-center ">
            <v-icon
              :color="item.estatus == 'mdi-phone-check' ? 'green' : 'error'"
              >{{ item.estatus }}</v-icon
            >
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  data: () => ({
    Agentes: [
      {
        agente: "Carlos",
        estatus: "mdi-food"
      },
      {
        agente: "Yuja",
        estatus: "mdi-phone-check"
      },
      {
        agente: "Aleidri",
        estatus: "mdi-toilet"
      },
      {
        agente: "Anggy",
        estatus: "mdi-food"
      },
      {
        agente: "Desire",
        estatus: "mdi-phone-check"
      },
      {
        agente: "Daniel",
        estatus: "mdi-phone-check"
      },
      {
        agente: "Ligser",
        estatus: " mdi-account-tie"
      },
      {
        agente: "Lignail",
        estatus: "mdi-phone-check"
      },
      {
        agente: "Oscar",
        estatus: "mdi-coffee"
      },
      {
        agente: "Omar",
        estatus: "mdi-food"
      },
      {
        agente: "Javier",
        estatus: "mdi-phone-check"
      },
      {
        agente: "Juan",
        estatus: "mdi-phone-check"
      }
    ]
  })
};
</script>

<style>
.naranja {
  background-color: #fd9917;
  color: black !important;
}
</style>

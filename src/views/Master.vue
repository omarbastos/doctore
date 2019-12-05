<template>
  <carousel
    data-aos="zoom-in-up"
    class="my-4"
    :paginationSize="7"
    paginationColor="black"
    paginationActiveColor="#fb693a"
    :perPage="1"
    :autoplay="true"
    :autoplayTimeout="10000"
    :autoplayHoverPause="true"
    :perPageCustom="[
      [0, 1],
      [480, 2],
      [1000, 2]
    ]"
  >
    <slide class="shadowcito" v-for="(item, index) in grupos" :key="index">
      <div>
        <h1 class="text-center display-2 my-4">{{ item.datos.grupoName }}</h1>
        <resumen-disponibilidad
          :series="item.datos.series"
        ></resumen-disponibilidad>
        <agent-table :datos="item.datos"></agent-table>
      </div>
    </slide>
  </carousel>
</template>

<script>
import AgentTable from "../components/AgentTable.vue";
import ResumenDisponibilidad from "../components/ResumenDisponibilidad.vue";
export default {
  components: {
    AgentTable,
    ResumenDisponibilidad
  },
  data: () => ({
    grupos: [
      {
        datos: {
          series: [7, 1, 0, 0, 1],
          grupoName: "La Nación",
          Agentes: [
            {
              agente: "Carlos",
              llegada: "1575462650",
              estatus: "almuerzo",
              tardias: "1",
              name: "Test emit",
              data: [4, 3, 4, 4, 5, 5, 2, 9, 2, 5, 1, 5, 13, 9, 17, 2, 7, 5]
            },
            {
              agente: "Yuja",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "1"
            },
            {
              agente: "Aleidri",
              llegada: "1575462650",
              estatus: "up",
              tardias: "1"
            },
            {
              agente: "Anggy",
              llegada: "1575462650",
              estatus: "almuerzo",
              tardias: "1"
            },
            {
              agente: "Desire",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "0"
            },
            {
              agente: "Daniel",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "2"
            },
            {
              agente: "Ligser",
              llegada: "1575446854",
              estatus: "rs",
              tardias: "4"
            },
            {
              agente: "Lignail",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "1"
            },
            {
              agente: "Oscar",
              llegada: "1575462650",
              estatus: "coffe",
              tardias: "0"
            },
            {
              agente: "Omar",
              llegada: "1575462650",
              estatus: "almuerzo",
              tardias: "1"
            },
            {
              agente: "Javier",
              llegada: "1575462650",
              estatus: "coffe",
              tardias: "0"
            },
            {
              agente: "Juan",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "0"
            }
          ]
        }
      },
      {
        datos: {
          series: [7, 1, 0, 0, 1],

          grupoName: "Cobros Tigo",

          Agentes: [
            {
              agente: "Carlos",
              llegada: "1575462650",
              estatus: "almuerzo",
              tardias: "1",
              name: "Test emit",
              data: [4, 3, 4, 4, 5, 5, 2, 9, 2, 5, 1, 5, 13, 9, 17, 2, 7, 5]
            },
            {
              agente: "Yuja",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "1"
            },
            {
              agente: "Aleidri",
              llegada: "1575462650",
              estatus: "up",
              tardias: "1"
            },
            {
              agente: "Anggy",
              llegada: "1575462650",
              estatus: "almuerzo",
              tardias: "1"
            },
            {
              agente: "Desire",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "0"
            },
            {
              agente: "Daniel",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "2"
            },
            {
              agente: "Ligser",
              llegada: "1575446854",
              estatus: "rs",
              tardias: "4"
            },
            {
              agente: "Lignail",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "1"
            },
            {
              agente: "Oscar",
              llegada: "1575462650",
              estatus: "coffe",
              tardias: "0"
            },
            {
              agente: "Omar",
              llegada: "1575462650",
              estatus: "almuerzo",
              tardias: "1"
            },
            {
              agente: "Javier",
              llegada: "1575462650",
              estatus: "coffe",
              tardias: "0"
            },
            {
              agente: "Juan",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "0"
            }
          ]
        }
      },
      {
        datos: {
          series: [5, 1, 4, 0, 1],

          grupoName: "Cable Cartago",

          Agentes: [
            {
              agente: "Carlos",
              llegada: "1575462650",
              estatus: "almuerzo",
              tardias: "1",
              name: "Test emit",
              data: [4, 3, 4, 4, 5, 5, 2, 9, 2, 5, 1, 5, 13, 9, 17, 2, 7, 5]
            },
            {
              agente: "Yuja",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "1"
            },
            {
              agente: "Aleidri",
              llegada: "1575462650",
              estatus: "up",
              tardias: "1"
            },
            {
              agente: "Anggy",
              llegada: "1575462650",
              estatus: "almuerzo",
              tardias: "1"
            },
            {
              agente: "Desire",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "0"
            },
            {
              agente: "Daniel",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "2"
            },
            {
              agente: "Ligser",
              llegada: "1575446854",
              estatus: "rs",
              tardias: "4"
            },
            {
              agente: "Lignail",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "1"
            },
            {
              agente: "Oscar",
              llegada: "1575462650",
              estatus: "coffe",
              tardias: "0"
            },
            {
              agente: "Omar",
              llegada: "1575462650",
              estatus: "almuerzo",
              tardias: "1"
            },
            {
              agente: "Javier",
              llegada: "1575462650",
              estatus: "coffe",
              tardias: "0"
            },
            {
              agente: "Juan",
              llegada: "1575462650",
              estatus: "disponible",
              tardias: "0"
            }
          ]
        }
      }
    ]
  })
};
</script>

<style>
.shadowcito {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3), 0 5px 12px rgba(0, 0, 0, 0.22);
  margin: 10px;
}
@media only screen and (max-width: 600px) {
  .shadowcito {
    margin: 0px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.22);
  }
}
</style>

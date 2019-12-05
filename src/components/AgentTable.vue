<template>
  <div>
    <v-simple-table class="table-width" elevation="24" dense height="300px">
      <template v-slot:default>
        <thead class="naranja">
          <tr>
            <th class="white--text text-center font-weight-bold">AGENTE</th>
            <th class="white--text text-center font-weight-bold">
              HORA DE LLEGADA
            </th>

            <th class="white--text text-center font-weight-bold">TARDIAS</th>
            <th class="white--text text-center font-weight-bold">ESTATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="selectAgent(item)"
            v-for="item in datos.Agentes"
            :key="item.agente"
          >
            <td class="text-center font-weight-bold font-italic">
              {{ item.agente }}
            </td>
            <td class="text-center font-weight-bold">
              {{ item.llegada | formatDate }}
            </td>
            <td
              :class="
                item.tardias > 0
                  ? 'text-center   tardia-red'
                  : 'text-center  tardia '
              "
            >
              {{ item.tardias }}
            </td>
            <td class="text-center">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      :color="
                        item.estatus == 'disponible' ? '#12560d' : '#ff0000'
                      "
                      >{{ item.estatus | estatusSwitch }}</v-icon
                    >
                  </v-btn>
                </template>
                <span>{{ item.estatus.toUpperCase() }}</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div class="ma-4 d-flex justify-center">
      <v-btn
        x-large=""
        color="#fd9917"
        elevation="24"
        class="white--text font-weight-bold"
        @click="exportExcel"
        >Export to Excel</v-btn
      >
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";
export default {
  props: {
    datos: {
      type: Object,
      default: () => ({
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
      })
    }
  },

  filters: {
    estatusSwitch(value) {
      switch (value) {
        case "disponible":
          return "mdi-phone-check";

        case "almuerzo":
          return "mdi-food";

        case "coffe":
          return "mdi-coffee";

        case "rs":
          return "mdi-account-tie";

        case "up":
          return "mdi-toilet";

        default:
      }
    }
  },

  methods: {
    exportExcel: function() {
      let data = XLSX.utils.json_to_sheet(this.Agentes);
      const workbook = XLSX.utils.book_new();

      const filename = "devschile-admins";
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    selectAgent(item) {
      this.$emit("agent-selected", item);
    }
  }
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .table-width {
    max-width: 320px;
  }
  .tardia {
    font-size: 1rem !important;
    color: #12560d;
    font-weight: 900;
  }
  .tardia-red {
    color: #ff0000;
    font-size: 1rem !important;
    font-weight: 900;
  }
}

.naranja {
  background-color: #fd9917;
}
.tardia {
  font-size: 1.5rem !important;
  color: #12560d;
  font-weight: 900;
}
.tardia-red {
  color: #ff0000;
  font-size: 1.5rem !important;
  font-weight: 900;
}
</style>

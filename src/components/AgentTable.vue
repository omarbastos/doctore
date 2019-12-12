<template>
  <div class="responsive-card">
    <v-simple-table class="table-width" elevation="24" dense height="300px">
      <template v-slot:default>
        <thead class="naranja">
          <tr>
            <th class="white--text text-center font-weight-bold">AGENTE</th>
            <th class="white--text text-center font-weight-bold">HORA DE LLEGADA</th>

            <th class="white--text text-center font-weight-bold">TARDIAS</th>
            <th class="white--text text-center font-weight-bold">ESTATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="selectAgent(item)" v-for="(item, index) in sessions" :key="index">
            <td class="text-center font-weight-bold font-italic">{{ item.fullname }}</td>
            <td class="text-center font-weight-bold">{{ item.llegada.createdAt | formatLlegada}}</td>
            <td
              :class="
                item.tardias > 0
                  ? 'text-center   tardia-red'
                  : 'text-center  tardia '
              "
            >{{ item.tardias }}</td>
            <td class="text-center">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      :color="
                        item.status.text == 'Disponible' ? '#12560d' : '#ff0000'
                      "
                    >{{ item.status.valor | estatusSwitch }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ item.status.text.toUpperCase() }}</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div class="ma-4 d-flex justify-center">
      <v-btn
        x-large
        color="#fd9917"
        elevation="24"
        class="white--text font-weight-bold"
        @click="exportExcel"
      >Export to Excel</v-btn>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import XLSX from "xlsx";
export default {
  props: {
    sessions: {},

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
  data: () => ({}),
  filters: {
    formatLlegada(value) {
      return moment(value).format("LT");
    },
    estatusSwitch(value) {
      switch (value) {
        case 0:
          return "mdi-phone-check";

        case 4:
          return "mdi-food";

        case 1:
          return "mdi-coffee";

        case 3:
          return "mdi-account-tie";

        case 2:
          return "mdi-toilet";

        default:
      }
    }
  },

  methods: {
    exportExcel: function() {
      let data = XLSX.utils.json_to_sheet(this.datos.Agentes);
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
.responsive-card {
  width: 100%;
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

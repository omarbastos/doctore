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
            <td class="text-center font-weight-bold">{{ item.llegada.createdAt | formatLlegada }}</td>
            <td
              :class="
                item.tardias > 0
                  ? 'text-center   tardia-red'
                  : 'text-center  tardia '"
            >{{ item.tardias }}</td>
            <td class="text-center">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      :color="
                        item.status.text == 'Disponible' ? '#12560d' : '#ff0000'"
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
  </div>
</template>
<script>
import moment from "moment";
import XLSX from "xlsx";
export default {
  props: {
    sessions: {}
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

        case 5:
          return "mdi-account-off";
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

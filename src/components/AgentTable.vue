<template>
  <div>
    <v-simple-table dark>
      <template v-slot:default>
        <thead class="naranja">
          <tr>
            <th class="black--text text-center font-weight-bold">AGENTE</th>
            <th class="black--text text-center font-weight-bold">HORA DE LLEGADA</th>

            <th class="black--text text-center font-weight-bold">TARDIAS</th>
            <th class="black--text text-center font-weight-bold">ESTATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Agentes" :key="item.agente">
            <td class="text-center font-weight-medium font-italic">{{ item.agente }}</td>
            <td class="text-center font-weight-medium">{{ item.llegada | formatDate }}</td>
            <td
              :class="
                item.tardias > 0
                  ? 'text-center font-weight-medium tardia tardia-red'
                  : 'text-center font-weight-medium tardia '
              "
            >{{ item.tardias }}</td>
            <td class="text-center">
              <v-icon
                :color="item.estatus == 'mdi-phone-check' ? 'green' : 'red'"
              >{{ item.estatus }}</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div class="ma-4 d-flex justify-center">
      <v-btn color="success" @click="exportExcelx">Export to Excel</v-btn>
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";
export default {
  data: () => ({
    Agentes: [
      {
        agente: "Carlos",
        llegada: "1575462650",
        estatus: "mdi-food",
        tardias: "1"
      },
      {
        agente: "Yuja",
        llegada: "1575462650",
        estatus: "mdi-phone-check",
        tardias: "1"
      },
      {
        agente: "Aleidri",
        llegada: "1575462650",
        estatus: "mdi-toilet",
        tardias: "1"
      },
      {
        agente: "Anggy",
        llegada: "1575462650",
        estatus: "mdi-food",
        tardias: "1"
      },
      {
        agente: "Desire",
        llegada: "1575462650",
        estatus: "mdi-phone-check",
        tardias: "0"
      },
      {
        agente: "Daniel",
        llegada: "1575462650",
        estatus: "mdi-phone-check",
        tardias: "2"
      },
      {
        agente: "Ligser",
        llegada: "1575446854",
        estatus: " mdi-account-tie",
        tardias: "4"
      },
      {
        agente: "Lignail",
        llegada: "1575462650",
        estatus: "mdi-phone-check",
        tardias: "1"
      },
      {
        agente: "Oscar",
        llegada: "1575462650",
        estatus: "mdi-coffee",
        tardias: "0"
      },
      {
        agente: "Omar",
        llegada: "1575462650",
        estatus: "mdi-food",
        tardias: "1"
      },
      {
        agente: "Javier",
        llegada: "1575462650",
        estatus: "mdi-phone-check",
        tardias: "0"
      },
      {
        agente: "Juan",
        llegada: "1575462650",
        estatus: "mdi-phone-check",
        tardias: "0"
      }
    ]
  }),
  filters: {},
  methods: {
    exportExcel: function() {
      let data = XLSX.utils.json_to_sheet(this.Agentes);
      const workbook = XLSX.utils.book_new();
      workbook.Props = {
        Title: "Tabla de Usuarios",
        CreatedDate: new Date(2017, 12, 19)
      };
      const filename = "devschile-admins";
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    }
  }
};
</script>

<style>
.naranja {
  background-color: #fd9917;
  color: black !important;
}
.tardia {
  font-size: 1.5rem !important;
  text-shadow: 1px 1px 0 green, -1px -1px 0 green, 1px -1px 0 green,
    -1px 1px 0 green, 1px 1px 0 green;
}
.tardia-red {
  color: #ff0000;
  text-shadow: 1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white,
    -1px 1px 0 white, 1px 1px 0 white;
}
</style>

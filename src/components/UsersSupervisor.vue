<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        @click:append-outer="exportExcel"
      >
        <template v-slot:append-outer>
          <v-menu style="top: -12px" offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="#fc9a3a" v-on="on">
                <v-icon left>mdi-menu</v-icon>
                MENU
              </v-btn>
            </template>
            <v-card>
              <v-card-text class="pa-6">
                <download-excel
                  class="btn btn-default"
                  :data="users"
                  :fields="json_fields"
                  worksheet="My Worksheet"
                  :name="todayExcel"
                >
                  <v-btn large flat @click="exportExcel"
                    ><v-icon color="#FC9A3A" left>mdi-file-excel</v-icon
                    >Exportar como Excel</v-btn
                  >
                </download-excel>
                <br />
                <v-btn large flat @click="exportPDF"
                  ><v-icon color="#FC9A3A" left>mdi-pdf-box</v-icon>Exportar
                  como PDF</v-btn
                >
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-card-title>
    <v-data-table
      id="myTable"
      @click:row="selectAgent"
      :headers="headers"
      :items="usersFiltradas"
      :search="search"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
  </v-card>
</template>
<script>
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import XLSX from "xlsx";
import { usersCollection } from "../firebase";
export default {
  props: {},
  data: () => ({
    users: {},
    search: "",
    json_fields: {
      Agentes: "fullname",
      Team: "grupo",
      "Sumatoria Tardias": "tardias",
      "Tardias UP": "UP",
      "Tardias CF": "CF",
      "Tardias AI": "AI",
      Asistencia: "asistencias",
      Cargo: "level",
      "Ultima sesión": "lastSession"
    },
    columns: [
      { title: "Agentes", dataKey: "fullname" },
      { title: "Team", dataKey: "grupo" },
      { title: "Sumatoria Tardias", dataKey: "tardias" },
      { title: "Tardias UP", dataKey: "UP" },
      { title: "Tardias AI", dataKey: "AI" },
      { title: "Tardias CF", dataKey: "CF" },
      { title: "Asistencia", dataKey: "asistencias" },
      { title: "Cargo", dataKey: "level" },
      { title: "Ultima sesión", dataKey: "lastSession" }
    ],
    headers: [
      {
        text: "Agentes",
        align: "left",
        sortable: true,
        value: "fullname",
        filterable: true
      },
      { text: "Team", value: "grupo" },
      { text: "Sumatoria Tardias", value: "tardias" },
      { text: "Tardias UP", value: "UP" },
      { text: "Tardias UP", value: "AI" },
      { text: "Tardias CF", value: "CF" },
      { text: "Tardias CF", value: "CF" },
      { text: "Tardias Llegada", value: "llegada" },
      { text: "Asistencia", value: "asistencias" },
      { text: "Cargo", value: "level" },
      { text: "Ultima sesión", value: "lastSession" }
    ]
  }),
  filters: {
    fechaEsp(value) {
      moment.locale("es");
      return moment(value).format("llll");
    }
  },
  firestore() {
    return {
      users: usersCollection
    };
  },
  computed: {
    usersFiltradas() {
      let self = this;
      return self.users.filter(function(users) {
        return users.grupo === self.$store.getters.userGrupo;
      });
    },
    todayExcel() {
      let today = moment().unix();
      let retorno = `${this.$store.getters.userGrupo}${today}.xls`;
      return retorno;
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
      this.$emit("user-selected", item);
    },
    exportPDF() {
      let today = moment().unix();
      let pdfName = `${this.$store.getters.userGrupo}${today}`;
      const doc = new jsPDF("l", "pt");
      doc.text("Umana Consultants: Reporte de Usuarios", 40, 40);
      doc.autoTable(this.columns, this.usersFiltradas, {
        theme: "grid",
        styles: {
          halign: "center",
          cellWidth: "wrap"
        },
        headStyles: {
          fillColor: "#fc9a3a"
        },
        margin: { top: 60 }
      });
      doc.save(pdfName + ".pdf");
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

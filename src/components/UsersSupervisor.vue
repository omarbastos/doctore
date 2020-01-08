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
          <download-excel
            class="btn btn-default"
            :data="usersFiltradas"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="filename.xls"
          >
            <v-icon color="#FC9A3A">mdi-file-excel</v-icon>
          </download-excel>
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

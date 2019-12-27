<template>
  <div>
    <v-row justify="center">
      <v-col>
        <tabla-horario @fbDia="updateDay" :user="user"></tabla-horario>
      </v-col>
      <v-col>
        <v-simple-table class="my-4">
          <template v-slot:default>
            <thead class="naranja">
              <tr>
                <th class="text-center subtitle-1">Agente</th>
                <th class="text-center subtitle-1">Asistencias</th>
                <th class="text-center subtitle-1">Tardias </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-center font-weight-bold">{{ user.fullname }}</td>
                <td class="text-center font-weight-bold">{{ user.asistencias }}</td>
                <td class="text-center font-weight-bold">{{ tardias }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <div id="chart">
      <apexchart type="bar" height="350" :options="chartOptions" :series="serias" />
    </div>
    <v-divider></v-divider>

    <v-btn
      fab
      @click="emitClose"
      color="error"
      large
      dark
      right
      bottom
      fixed
      class="v-btn--example"
    >
      <v-icon color="white">mdi-arrow-left</v-icon>
    </v-btn>
  </div>
</template>

<script>
import TablaHorario from "./TablaHorario";
import { usersCollection, sessionsCollection } from "../firebase";
export default {
  components: {
    TablaHorario
  },
  props: {
    agent: {
      type: Object,
      default: () => ({
        agente: "Omar"
      })
    }
  },
  firestore() {
    return {
      historicoSessions: sessionsCollection.where(
        "user",
        "==",
        this.agent.user
      ),
      user: usersCollection.doc(this.agent.user)
    };
  },

  computed: {
    // horarioSemanal() {
    //   return [
    //     {
    //       dia: "Lunes",
    //       horaLlegada: this.user.horario.monday
    //     },
    //     {
    //       dia: "Martes",
    //       horaLlegada: this.user.horario.tuesday
    //     },
    //     {
    //       dia: "Miercoles",
    //       horaLlegada: this.user.horario.wednesday
    //     },
    //     {
    //       dia: "Jueves",
    //       horaLlegada: this.user.horario.thursday
    //     },
    //     {
    //       dia: "Viernes",
    //       horaLlegada: this.user.horario.friday
    //     },
    //     {
    //       dia: "Sabado",
    //       horaLlegada: this.user.horario.saturday
    //     },
    //     {
    //       dia: "Domingo",
    //       horaLlegada: this.user.horario.sunday
    //     }
    //   ];
    // },
    tardias(){
        let result = this.historicoSessions.reduce(function (acc, obj) { return acc + obj.tardias; }, 0); // 7
        return result
    },
    serias() {
      let objUP = {
        name: "UP",
        data: []
      };
      objUP.data = this.historicoSessions.map(({ UP, llegada }) => [
        llegada.createdAt,
        UP.flag * 1
      ]);
      let objLlegada = {
        name: "llegada",
        data: []
      };
      objLlegada.data = this.historicoSessions.map(({ llegada }) => [
        llegada.createdAt,
        llegada.flag * 1
      ]);
      let objAI = {
        name: "AI",
        data: []
      };
      objAI.data = this.historicoSessions.map(({ AI, llegada }) => [
        llegada.createdAt,
        AI.flag * 1
      ]);
      let objCF1 = {
        name: "CF1",
        data: []
      };
      objCF1.data = this.historicoSessions.map(({ CF1, llegada }) => [
        llegada.createdAt,
        CF1.flag * 1
      ]);
      let objCF2 = {
        name: "CF2",
        data: []
      };
      objCF2.data = this.historicoSessions.map(({ llegada, CF2 }) => [
        llegada.createdAt,
        CF2.flag * 1
      ]);
      let series = [objUP, objAI, objCF1, objCF2, objLlegada];
      return series;
    }
  },
  data: () => ({
    open: false,
    user: {},
    historicoSessions: [],
    value: null,
    chartOptions: {
      colors: ["#E85F14", "#A538B6", "#4E5FBB", "#4E5FBB", "#ff0000"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },

      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "Tardias"
        },
        tickAmount: 2,
        min: 0,
        max: 2
      },
      fill: {
        opacity: 1
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            toolbar: {
              tools: {
                pan: true
              }
            }
          }
        }
      ],
      tooltip: {
        y: {
          formatter: function(val) {
            return val + " tardia";
          }
        }
      }
    }
  }),

  methods: {
    emitClose() {
      this.$emit("close-historico");
    },

    updateDay(day, value) {
      let dia = `horario.${day}`;
      this.$firestore.user.update({
        [dia]: value
      });
    }
  }
};
</script>

<style></style>

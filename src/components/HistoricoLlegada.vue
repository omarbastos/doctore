<template>
  <div>
    <div id="chart">
      <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="serias"
      />
    </div>

    <v-btn fab @click="emitClose" absolute bottom right color="red">
      <v-icon color="white">mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { usersCollection, sessionsCollection } from "../firebase";
export default {
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
  filters: {
    minutesToHour(value) {
      let num = value;
      let hours = num / 60;
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      if (rminutes < 10) {
        rminutes = `0${rminutes}`;
      }
      if (rhours < 10) {
        rhours = `0${rhours}`;
      }
      return `${rhours}:${rminutes}`;
    }
  },
  computed: {
    horarioSemanal() {
      return [
        {
          dia: "Lunes",
          horaLlegada: this.user.horario[1]
        },
        {
          dia: "Martes",
          horaLlegada: this.user.horario[2]
        },
        {
          dia: "Miercoles",
          horaLlegada: this.user.horario[3]
        },
        {
          dia: "Jueves",
          horaLlegada: this.user.horario[4]
        },
        {
          dia: "Viernes",
          horaLlegada: this.user.horario[5]
        },
        {
          dia: "Sabado",
          horaLlegada: this.user.horario[6]
        },
        {
          dia: "Domingo",
          horaLlegada: this.user.horario[0]
        }
      ];
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
    user: {},
    historicoSessions: [],

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
    }
  }
};
</script>

<style></style>

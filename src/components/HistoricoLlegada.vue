<template>
  <div>
    <div id="chart">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series" />
    </div>

    <v-card class="container">
      <v-card-title class="text-center">Editar Horario de {{agent.agente}}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="(item,index) in horarioSemanal" :key="index" cols="12" sm="6">
            <v-menu
              ref="horarioSemanal"
              v-model="item.menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="item.horaLlegada"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="item.horaLlegada"
                  :label="item.dia"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="item.menu2"
                v-model="item.horaLlegada"
                full-width
                @click:minute="updateHorario(item,index)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-btn fab @click="emitClose" absolute bottom right color="red">
      <v-icon color="white">mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    agent: {
      type: Object,
      default: () => ({
        agente: "Omar"
      })
    }
  },
  data: () => ({
    horarioSemanal: [
      { dia: "Lunes", horaLlegada: "08:00", menu2: false, menu: "menu" },
      { dia: "Martes", horaLlegada: "08:00", menu2: false, menu: "menu" },
      { dia: "Miercoles", horaLlegada: "08:00", menu2: false, menu: "menu" },
      { dia: "Jueves", horaLlegada: "08:00", menu2: false, menu: "menu" },
      { dia: "Viernes", horaLlegada: "08:00", menu2: false, menu: "menu" },
      { dia: "Sabado", horaLlegada: "08:00", menu2: false, menu: "menu" },
      { dia: "Domingo", horaLlegada: "08:00", menu2: false, menu: "menu" }
    ],
    //config
    series: [
      {
        name: "UP",
        data: [
          ["02-10-2017 GMT", 1],
          ["02-11-2017 GMT", 0],
          ["02-12-2017 GMT", 0],
          ["02-13-2017 GMT", 1],
          ["02-14-2017 GMT", 0],
          ["02-15-2017 GMT", 1],
          ["02-16-2017 GMT", 0],
          ["02-17-2017 GMT", 1],
          ["02-18-2017 GMT", 0]
        ]
      },
      {
        name: "AI",
        data: [
          ["02-10-2017 GMT", 0],
          ["02-11-2017 GMT", 0],
          ["02-12-2017 GMT", 0],
          ["02-13-2017 GMT", 0],
          ["02-14-2017 GMT", 0],
          ["02-15-2017 GMT", 1],
          ["02-16-2017 GMT", 0],
          ["02-17-2017 GMT", 0],
          ["02-18-2017 GMT", 1]
        ]
      },
      {
        name: "CF",
        data: [
          ["02-10-2017 GMT", 2],
          ["02-11-2017 GMT", 0],
          ["02-12-2017 GMT", 0],
          ["02-13-2017 GMT", 1],
          ["02-14-2017 GMT", 0],
          ["02-15-2017 GMT", 2],
          ["02-16-2017 GMT", 0],
          ["02-17-2017 GMT", 0],
          ["02-18-2017 GMT", 1]
        ]
      },
      {
        name: "LLEGADA",
        data: [
          ["02-10-2017 GMT", 1],
          ["02-11-2017 GMT", 0],
          ["02-12-2017 GMT", 0],
          ["02-13-2017 GMT", 1],
          ["02-14-2017 GMT", 1],
          ["02-15-2017 GMT", 1],
          ["02-16-2017 GMT", 0],
          ["02-17-2017 GMT", 0],
          ["02-18-2017 GMT", 0]
        ]
      }
    ],
    chartOptions: {
      colors: ["#E85F14", "#A538B6", "#4E5FBB", "#ff0000"],
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
  created() {},
  methods: {
    emitClose() {
      this.$emit("close-historico");
    },
    updateHorario(item, index) {
      this.$refs.horarioSemanal[index].save(item.horaLlegada);
      //params: {

      // axios.put(url,params)
    }
  }
};
</script>

<style></style>

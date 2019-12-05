<template>
  <div id="chart">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
    <v-btn fab @click="emitClose" fixed bottom right color="red"
      ><v-icon color="white">mdi-close</v-icon></v-btn
    >
  </div>
</template>

<script>
export default {
  props: {
    agent: {
      type: Object,
      default: () => ({
        name: "Omar",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        categories: [
          "1/11/2011",
          "2/11/2011",
          "3/11/2011",
          "4/11/2011",
          "5/11/2011",
          "6/11/2011",
          "7/11/2011",
          "8/11/2011",
          "9/11/2011",
          "10/11/2011",
          "11/11/2011",
          "12/11/2011",
          "1/11/2012",
          "2/11/2012",
          "3/11/2012",
          "4/11/2012",
          "5/11/2012",
          "6/11/2012"
        ]
      })
    }
  },
  data: () => ({
    series: [
      {
        name: "Tardias",
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
        categories: [
          "1/11/2011",
          "2/11/2011",
          "3/11/2011",
          "4/11/2011",
          "5/11/2011",
          "6/11/2011",
          "7/11/2011",
          "8/11/2011",
          "9/11/2011",
          "10/11/2011",
          "11/11/2011",
          "12/11/2011",
          "1/11/2012",
          "2/11/2012",
          "3/11/2012",
          "4/11/2012",
          "5/11/2012",
          "6/11/2012"
        ]
      }
    ],
    chartOptions: {
      chart: {
        type: "line",
        shadow: {
          enabled: true,
          color: "black",
          top: 3,
          left: 2,
          blur: 3,
          opacity: 1
        }
      },
      stroke: {
        width: 7,
        curve: "smooth"
      },

      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: "black",
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            cssClass: "apexcharts-xaxis-label"
          }
        },
        categories: [
          "1/11/2001",
          "2/11/2001",
          "3/11/2001",
          "4/11/2001",
          "5/11/2001",
          "6/11/2001",
          "7/11/2001",
          "8/11/2001",
          "9/11/2001",
          "10/11/2001",
          "11/11/2001",
          "12/11/2001",
          "1/11/2001",
          "2/11/2001",
          "3/11/2001",
          "4/11/2001",
          "5/11/2001",
          "6/11/2001"
        ]
      },
      title: {
        text: "Historico Tardias",
        align: "center",
        style: {
          fontSize: "30px",
          color: "black"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.9,
          gradientToColors: [], // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100],
          colorStops: []
        }
      },
      markers: {
        size: 4,
        opacity: 0.9,
        colors: ["#FFA41B"],
        strokeColor: "#fff",
        strokeWidth: 2,

        hover: {
          size: 7
        }
      },
      yaxis: {
        min: -10,
        max: 40,
        title: {
          text: "Tardias"
        }
      }
    }
  }),
  created() {
    this.chartOptions.xaxis.categories = this.agent.categories;
    this.chartOptions.title.text = `Historico de ${this.agent.name}`;
    this.series[0].data = this.agent.data;
  },
  methods: {
    emitClose() {
      this.$emit("close-historico");
    }
  }
};
</script>

<style></style>

<template>
  <div class="orange-gradient justify-center d-flex my-4">
    <div class="chart-wrap">
      <div id="chart">
        <apexchart type="rangeBar" width="580" :options="chartOptions" :series="series" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    //

    series: [
      {
        data: [
          {
            x: "TEAM A",
            y: [65, 96]
          },
          {
            x: "TEAM B",
            y: [55, 78]
          },
          {
            x: "TEAM C",
            y: [95, 186]
          }
        ]
      }
    ],
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    chartOptions: {
      title: {
        text: "Resumen de Disponibilidad",
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "16px",
          color: "white"
        }
      },
      chart: {
        toolbar: {
          show: true,
          tools: {
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            download: true,
            pan: true,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: []
          },
          autoSelected: "zoom"
        }
      },
      colors: ["#4BB543", "#e95f18", "#3F51B5", "#A538B6", "#836357"],
      labels: [
        "Disponible",
        "Urgencia Personal",
        "Café",
        "Almuerzo",
        "Reunion Supervisor"
      ],

      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val.toFixed(0) + "%";
        }
      },
      theme: {
        colorPalette: ["#4BB543", "#e95f18", "#3F51B5", "#A538B6", "#836357"]
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 320
            },
            tooltip: {
              fillSeriesColor: true
            },
            legend: {
              position: "bottom",
              offsetY: 0,
              height: 100,
              show: true,
              fontSize: "12px",
              labels: {
                colors: "#ffffff",
                useSeriesColors: false
              }
            }
          }
        }
      ],
      legend: {
        position: "right",
        offsetY: 0,
        height: 230,
        show: true,
        fontSize: "18px",
        labels: {
          colors: "#ffffff",
          useSeriesColors: false
        }
      }
    }
  }),
  methods: {
    appendData: function() {
      var arr = this.series.slice();
      arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);
      this.series = arr;
    },

    removeData: function() {
      if (this.series.length === 1) return;
      var arr = this.series.slice();
      arr.pop();
      this.series = arr;
    },

    randomize: function() {
      this.series = this.series.map(() => {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      });
    },

    reset: function() {
      this.series = [44, 55, 13, 33];
    }
  }
};
</script>

<style>
</style>
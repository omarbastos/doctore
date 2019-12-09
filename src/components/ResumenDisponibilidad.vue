<template>
  <div class="orange-gradient justify-center d-flex my-4">
    <div class="chart-wrap">
      <div id="chart">
        <apexchart type="donut" width="500" :options="chartOptions" :series="series" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    series: {
      type: Array,
      default: () => [5, 1, 1, 1, 1]
    }
  },
  data: () => ({
    //

    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    chartOptions: {
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              show: false
            }
          }
        }
      ],
      title: {
        text: "Resumen de Disponibilidad",
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "16px",
          color: "black"
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
        "Uso Personal",
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

      legend: {
        position: "right",
        offsetY: 0,
        height: 230,
        show: true,
        fontSize: "18px",
        labels: {
          colors: "black",
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

<style></style>

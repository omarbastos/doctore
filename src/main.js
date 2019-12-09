import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/css/animate.css";
import MarqueeText from "vue-marquee-text-component";
import AOS from "aos";
import "aos/dist/aos.css";
import VueApexCharts from "vue-apexcharts";
import moment from "moment";
import VueCarousel from "vue-carousel";
import Vuex from "vuex";

Vue.use(Vuex);
Vue.use(VueCarousel);
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment.unix(value).format("LT");
  }
});

Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);
Vue.component("marquee-text", MarqueeText);
Vue.config.productionTip = false;
import axios from "axios";
import VueAxios from "vue-axios";
Vue.prototype.$http = axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  created() {
    AOS.init();
  },
  render: h => h(App)
}).$mount("#app");

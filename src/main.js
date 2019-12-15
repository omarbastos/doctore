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
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css"; //Vuesax styles
Vue.use(Vuesax, {
  // options here
});
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

//Firebase

import VueFirestore from "vue-firestore";
Vue.use(VueFirestore);
// import { auth } from "./firebase";
// auth.onAuthStateChanged(user => {
//   if (user) {
//     store.dispatch("TRAER_USUARIO", user);
//   } else {
//     // No user is signed in.
//   }
// });
new Vue({
  router,
  store,
  vuetify,
  created() {
    AOS.init();
  },
  render: h => h(App)
}).$mount("#app");

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
Vue.component("marquee-text", MarqueeText);
Vue.config.productionTip = false;
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  vuetify,
  created() {
    AOS.init();
  },
  render: h => h(App)
}).$mount("#app");

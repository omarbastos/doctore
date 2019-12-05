import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    temporalAgent: null
  },
  mutations: {
    saveAgent(item) {
      this.state.temporalAgent = item;
    }
  },
  actions: {
    agentSelected(item) {
      this.commit("saveAgent", item);
    }
  },
  modules: {}
});

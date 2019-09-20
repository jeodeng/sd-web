import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasShowLogin: false,
  },
  mutations: {
    toggleLogin(state, val = false) {
      state.hasShowLogin = val;
    },
  },
  actions: {

  },
});

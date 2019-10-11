import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters: {
    token: state => state.token,
    name: state => state.name
  },
  state: {
    token: null,
    hasShowLogin: false,
  },
  mutations: {
    toggleLogin(state, val = false) {
      state.hasShowLogin = val;
    },
    SET_TOKEN(state, val) {
      state.token = val;
    },
  },
  actions: {

  },
})

export default store

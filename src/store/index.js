import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/storage';
import { setToken } from '@/utils/auth';
import { login } from '@/api/user';

Vue.use(Vuex)

const store = new Vuex.Store({
  getters: {
    token: state => state.token,
    name: state => state.user && state.user.name,
  },
  state: {
    token: null,
    hasShowLogin: false,
    user: null,
  },
  mutations: {
    toggleLogin(state, val = false) {
      state.hasShowLogin = val;
    },
    SET_TOKEN(state, val) {
      state.token = val;
    },
    SET_USER(state, val) {
      state.user = val;
    },
  },
  actions: {
    userLogin({ commit }, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          loginName: username.trim(),
          password,
          type: 0
        }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          commit('SET_USER', data)
          storage.set('user', data);
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/storage';
import { setToken, removeToken } from '@/utils/auth';
import { login, logout } from '@/api/user';

Vue.use(Vuex)

const store = new Vuex.Store({
  getters: {
    token: state => state.token,
    name: state => state.user ? state.user.name : '',
    cartNum: state => state.cartNum,
  },
  state: {
    token: null,
    hasShowLogin: false,
    user: null,
    cartNum: 0,
    cartList: [],
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
          type: 0,
        }).then(response => {
          const { data } = response;
          commit('SET_TOKEN', data.token);
          commit('SET_USER', data);
          storage.set('user', data);
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    userLoginOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.user.userId).then(() => {
          storage.clear();
          commit('SET_TOKEN', '');
          commit('SET_USER', null);
          removeToken();
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    userInfoGet({ commit }, token) {
      const user = storage.get('user');
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
      return user;
    },
    userInfoReset({ commit }) {
      storage.clear();
      commit('SET_TOKEN', '');
      commit('SET_USER', null);
      removeToken();
    },
  },
})

export default store

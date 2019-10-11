import Vue from 'vue';

import 'normalize.css/normalize.css' // 一个通用的reset css方案

// 引入插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss' // 全局css

import App from './App.vue';
import router from './router/router';
import store from '@/store';

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

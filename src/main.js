import Vue from 'vue';

// 引入插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';

import '@/styles/index.scss' // 全局css

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import '@/auth';

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

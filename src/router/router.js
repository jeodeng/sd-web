import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/product',
      name: 'Product',
      component: () => import(/* webpackChunkName: "about" */ '../views/product.vue'),
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import(/* webpackChunkName: "about" */ '../views/category.vue'),
    },
  ],
});

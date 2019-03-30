import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

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
      path: '/pos',
      name: 'pos',
      component: () => import('./components/pos/POS.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./components/admin/admin.vue'),
    },
  ],
});

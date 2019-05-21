import Vue from 'vue';
import filters from './filters/';
// @ts-ignore
import SuiVue from 'semantic-ui-vue';
import PortalVue from 'portal-vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(SuiVue);
Vue.use(PortalVue);
Vue.use(filters);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


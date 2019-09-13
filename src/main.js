import Vue from "vue";
import App from "./App.vue";
import axios from 'axios';
import lodash from 'lodash';

import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

const ax = axios.create({});
Vue.axios = ax;
Vue.prototype.$http = ax;
Vue.lodash = lodash;
Vue.prototype.$lodash = lodash;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

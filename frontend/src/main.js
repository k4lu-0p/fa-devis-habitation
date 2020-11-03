import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import $const from './constants';

Vue.config.productionTip = false
Vue.prototype.$const = $const;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

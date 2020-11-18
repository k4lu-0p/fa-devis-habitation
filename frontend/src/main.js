import Vue from 'vue'
import $axios from 'axios';
import $moment from 'moment';
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './plugins/vuelidate';

import $const from './constants';

// Composants globaux
import InputText from './components/Inputs/InputText';
import InputNumber from './components/Inputs/InputNumber';
import InputSelect from './components/Inputs/InputSelect';
import InputAutocomplete from './components/Inputs/InputAutocomplete';
import InputDate from './components/Inputs/InputDate';
import InputRadioList from './components/Inputs/InputRadioList';

Vue.component('input-text', InputText);
Vue.component('input-number', InputNumber);
Vue.component('input-select', InputSelect);
Vue.component('input-auto-complete', InputAutocomplete);
Vue.component('input-date', InputDate);
Vue.component('input-radio-list', InputRadioList);

Vue.config.productionTip = false
Vue.prototype.$const = $const;
Vue.prototype.$axios = $axios;
Vue.prototype.$moment = $moment;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

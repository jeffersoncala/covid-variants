import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

//Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//VueCompositionAPI
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false

Vue.router = router

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

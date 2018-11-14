import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './assets/js/mixin'
import './plugins/install'
import './registerServiceWorker'

import './assets/base.scss'
import './assets/reset.scss'
import './assets/list.scss'


Vue.config.productionTip = false

Vue.mixin(mixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

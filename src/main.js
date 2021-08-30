import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'vue-moment'
import VCalendar from 'v-calendar'

// Plugins
import './plugins/element.js'
import './plugins/datetime.js'
import './plugins/loading.js'
import './plugins/utils.js'
import './plugins/fuse.js'

import 'boxicons'
import 'reset-css'
import './styles/index.scss'

import { Loading } from 'element-ui'
Vue.prototype.$loading = Loading.service

Vue.use(moment)
Vue.use(VCalendar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

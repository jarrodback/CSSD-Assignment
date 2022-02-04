import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import '@/styles/style.scss'
import './validation'

/**
 * Import Bootstrap into Vue
 */
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

/**
 * Catch any api errors and throw a Javascript Error for the toast to catch
 */
axios.interceptors.response.use(response => response, (error) => {
  throw Error(error.response.data.message)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

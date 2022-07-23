import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'intersection-observer'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import '@babel/polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

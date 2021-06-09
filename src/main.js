import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "reset-css"
import "element-ui"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import http from "./http/index"
Vue.prototype.$http = http




Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

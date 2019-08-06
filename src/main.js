import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fetch from './api'

Vue.config.productionTip = false
// 创建全局
Vue.prototype.fetch = fetch

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

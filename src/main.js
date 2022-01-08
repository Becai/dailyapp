import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import AxiosUtils from "./utils/axiosUtils.js";

Vue.config.productionTip = false

// 将request方法挂载到Vue上
Vue.prototype.request = AxiosUtils.request;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

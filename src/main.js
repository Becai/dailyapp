import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import './assets/font/font.css'
import './assets/iconfont/iconfont.css'

import AxiosUtils from './utils/axiosUtils.js';

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false

// 全局事件总线
Vue.prototype.$bus = new Vue();

// 将request方法挂载到Vue上
Vue.prototype.request = AxiosUtils.request;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 公共bus.js
// 非父子组件之间传值，需要定义个公共的公共实例文件bus.js，作为中间仓库来传值，不然路由组件之间达不到传值的效果
// bus其实就是一个发布订阅模式，利用vue的自定义事件机制，在触发的地方通过$emit向外发布一个事件,在需要监听的页面，通过$on监听事件
import Vue from 'vue'
export default new Vue()
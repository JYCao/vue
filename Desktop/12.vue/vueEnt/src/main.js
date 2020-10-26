

// const { updateDom } = require('./tool.js')
// // es6中的模块化
// import {log} from './tooles6'

// updateDom ('app','index.html,dev-server')

// log('测试webpack是否能识别es6的模块化')

import Vue from "vue"
import App from './app.vue'
// 引入路由
import VueRouter from 'vue-router'
import Index from './pages/hero/index.vue'
import Add from './pages/hero/add.vue'
import Edit from './pages/hero/edit.vue'
import Zb  from './pages/zb/zb.vue'
import Jn from './pages/jn/jn.vue'
// 注册路由插件
Vue.use(VueRouter)
// 创建路由实例
const router = new VueRouter({
    routes: [
      {
        path: '/index', component: Index
      },
      {
        path: '/add', component: Add
      },
      {
        path: '/edit/:id', component: Edit
      },
      {
        path: '/zb', component: Zb
      },
      {
        path: '/jn', component: Jn
      },
      // 进入页面重定向
      {
        path: '/', component: Index
      },
    ]
})
new Vue({
  render(h) {
    return h(App)
  },
  // 挂载到vue实例上
  router
}).$mount("#app")
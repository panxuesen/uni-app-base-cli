import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import {RouterMount} from 'uni-simple-router'
import {COMMON} from '@/common'
import uView from "uview-ui"
Vue.use(uView)
// 通用业务逻辑挂载
Vue.use(COMMON)

const app = new Vue({
  mpType: 'app',
  router,
  store,
  ...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app,'#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

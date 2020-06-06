import Vue from 'vue'
import Router from 'uni-simple-router'

Vue.use(Router)

const router = new Router({
  routes:ROUTES //路由表 
});


// 系统默认的页面返回和tab切换不会触发守卫
//全局路由前置守卫
router.beforeEach((to, from, next) => {
  next()
})

// 全局路由后置守卫
router.afterEach((to, from) => {
})

export default router

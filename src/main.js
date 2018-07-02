// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//引入 router vuex
import router from './router'
import store from './store'
//引入ui库
import ElementUI from 'element-ui'
import '../static/theme/index.css'
//引入ajax
import axios from 'axios'
//引入 vuex管理状态

//数据mock
require('./mock.js')


axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
Vue.prototype.$_http = axios;
Vue.use(ElementUI)

Vue.config.productionTip = false


let loadingInstance

router.beforeEach((to, from, next) => {
  loadingInstance = ElementUI.Loading.service({ lock: true })//loadong 效果

  store.state.token = sessionStorage.getItem('token');//获取本地存储的token

  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token !== "") {  // 通过vuex state获取当前的token是否存
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

router.afterEach(route => {
  loadingInstance.close()
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
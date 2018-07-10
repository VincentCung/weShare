// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//引入 router vuex
import router from './router'
//import store from './store'
//引入ui库
import ElementUI from 'element-ui'
import './assets/css/theme/index.css'
//引入ajax
import axios from 'axios'


//数据mock
require('./mock.js')


//  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
Vue.prototype.$_http = axios;
Vue.use(ElementUI)

Vue.config.productionTip = false


// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  config => {
    let postRequireToken = false
    let getRequireToken = false
    if (config.method == 'post') {
      let data = config.data
      postRequireToken == !!data.token
     console.log(data)
    } else if (config.method == 'get') {
      if (config.params&&config.params.token) {
        getRequireToken = true
      }
    }
    
    if (postRequireToken || getRequireToken) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      config.headers.Authorization = localStorage.getItem('loginToken')
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          router.replace({
            path: '/404',
          })
          break;
        case 401:
          localStorage.removeItem('loginToken')
          router.replace({
            path: '/404',
          })
          break;
      }
    }
    return Promise.reject(error)
  });

router.beforeEach((to, from, next) => {
  let isLogin = !!localStorage.getItem('loginToken');//获取本地存储的token
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (isLogin) {
      next();
    }
    else {
      next({
        path: '/404',
      })
    }
  }
  else {
    next();
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
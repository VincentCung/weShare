// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//引入vue-router
import router from './router'
//引入ui库
import ElementUI from 'element-ui'
import '../static/theme/index.css'
//引入ajax
import axios from 'axios'
//引入 vuex管理状态
import Vuex from 'Vuex'
//数据mock
require('./mock.js')


axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
Vue.prototype.$_http = axios;
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false


const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
//注册状态管理全局参数
const store = new Vuex.Store({
  state: {
    token: '',
    userID: '',
    userName: '',
    email: '',
    photo: '',
    gender: '',
    is_banned: ''
  },
  mutations: {
    //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
    //内部操作必须在此刻完成(同步)
    [LOGIN](state, info) { // 第一个参数为 state 用于变更状态 登录
      sessionStorage.setItem("loginToken", info.token);
      state.token = info.token;
      state.userID = info.id,
        state.userName = info.name,
        state.email = info.email,
        state.photo = info.photo,
        state.gender = info.gender,
        state.is_banned = info.is_banned
    },
    [LOGOUT](state, info) { // 退出登录
      sessionStorage.removeItem("loginToken");
      state.token = '';
      state.userID = '',
        state.userName = '',
        state.email = '',
        state.photo = '',
        state.gender = '',
        state.is_banned = ''
    },
  },
  actions: {
    login(context, info) {
      context.commit('LOGIN', info)
    },
    logout(context, info) {
      context.commit('LOGOUT', info)
    }
  }
});


let loadingInstance

router.beforeEach((to, from, next) => {
  loadingInstance = ElementUI.Loading.service({lock:true})//loadong 效果

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
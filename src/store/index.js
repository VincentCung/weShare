import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
//注册状态管理全局参数
const store = new Vuex.Store({
  state: {
    is_login: false,
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
      state.userID = info.id
      state.userName = info.name
      state.email = info.email
      state.photo = info.photo
      state.gender = info.gender
      state.is_banned = info.is_banned
      state.is_login = true
    },
    [LOGOUT](state, info) { // 退出登录
      sessionStorage.removeItem("loginToken");
      state.token = '';
      state.userID = ''
      state.userName = ''
      state.email = ''
      state.photo = ''
      state.gender = ''
      state.is_banned = ''
      state.is_login = false
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

export default store
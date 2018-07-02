import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const getState = () => {
    let state = {}
    if (!!localStorage.getItem('loginToken')) {
        state.token = localStorage.getItem('loginToken')
        state.user = JSON.parse(localStorage.getItem('user_info'))
        state.is_login = true
    } else {
        state.token = ''
        state.user = {}
        state.is_login = false
    }
    return state
}

//注册状态管理全局参数
const store = new Vuex.Store({
    state: getState(),
    mutations: {
        //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
        //内部操作必须在此刻完成(同步)
        [LOGIN](state, info) { // 第一个参数为 state 用于变更状态 登录
            localStorage.setItem("loginToken", info.token);
            localStorage.setItem("user_info", JSON.stringify(info.user))
            
            state.token = info.token;
            state.user = info.user
            state.is_login = true
        },
        [LOGOUT](state, info) { // 退出登录
            localStorage.removeItem("loginToken");
            localStorage.removeItem("user_info")
            state.token = '';
            state.user = {}
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
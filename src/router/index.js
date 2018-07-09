import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Square from '@/pages/Square'
import Administrator from '@/pages/Administrator'
import Register from '@/pages/Register'
import InterestDetail from '@/pages/InterestDetail'
import InterestList from '@/pages/InterestList'
import InterestManage from '@/pages/InterestManage'
import MyDetail from '@/pages/MyDetail'
import PersonalBlog from '@/pages/PersonalBlog'
import SearchResult from '@/pages/SearchResult'
import BlogDetail from '@/pages/BlogDtail'
import notFound from '@/pages/notFound'


Vue.use(Router)
//TODO:判断登录态的需求
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/square',
      name: 'Square',
      component: Square
    },
    {
      path: '/administrator',
      name: 'Administrator',
      component: Administrator
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/interest',
      name: 'InterestDetail',
      component: InterestDetail,
    },
    { 
      path: "/interest/result",
      name: 'SearchResult',
      component: SearchResult
    },
    {
      path: '/more',
      name: 'InterestList',
      component: InterestList
    },
    {
      path: '/user/interest',
      name: 'InterestMange',
      component: InterestManage,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/blogs',
      name: 'PersonalBlog',
      component: PersonalBlog,
    },
    {
      path: '/blog',
      name: 'BlogDetail',
      component: BlogDetail,
    },
    {
      path: '/user/detail',
      name: 'MyDetail',
      component: MyDetail,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/404',
      name: 'notFound',
      component: notFound
    }
  ]
})

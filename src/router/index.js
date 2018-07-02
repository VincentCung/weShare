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
import MakeBlog from '@/pages/MakeBlog'
import SearchResult from '@/pages/SearchResult'


Vue.use(Router)

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
      children:[
        {
          path:"result",
          name:'SearchResult',
          component:SearchResult
        }
      ]
    }, 
    {
      path: '/more',
      name: 'InterestList',
      component: InterestList
    },
    {
      path: '/user',
      component:MakeBlog,
      children:[
        {
          path:'interest',
          name:'InterestMange',
          component:InterestManage
        },
        {
          path:'detail',
          name:'MyDetail',
          component:MyDetail
        }
      ]
    }
  ]
})

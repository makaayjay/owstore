import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexPages from '@/pages/index'
import Detail from '@/pages/detail'
import Forecast from '@/pages/detail/forecast'
import Count from '@/pages/detail/count'
import Analysis from  '@/pages/detail/analysis'
import Publish from '@/pages/detail/publish'
import OrderList from '@/pages/detail/orderList'

Vue.use(Router)

export default new Router({

  mode:"history",
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/',
      component:IndexPages,
    },
    {
      path:'/orderlist',
      component:OrderList,
    },
    {
      path:'/detail',
      component:Detail,
      redirect:'/detail/count',
      children:[
        {
        path:'forecast',
        name:'forecast',
        component:Forecast,
        },
        {
          path:'count',
          name:'count',
          component:Count,
        },
        {
          path:'analysis',
          name:'analysis',
          component:Analysis,
        },
        {
          path:'publish',
          name:'publish',
          component:Publish,
        }
      ]
    }
  ]
})

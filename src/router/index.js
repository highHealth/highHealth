import Vue from 'vue'
import Router from 'vue-router'
//引入登录组件
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import GoodsDetail from '@/components/goodsDetail.vue'
import Person from '@/components/person.vue'
import Order from '@/components/order.vue'
import Carts from '@/components/carts.vue'
import userOrder from "@/components/userorder.vue"
import Invited from "@/components/invited.vue"
import personDetail from '@/components/persondetail.vue'
import OrederNow from '@/components/orderNow.vue'
import Search from '@/components/search.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      //path是必须赋值的属性
      name:'home',
      path: '/',
      component: Home
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'goodsDetail',
      path: '/goodsDetail/:good_id/',
      component:GoodsDetail 
    },
    {
      name: 'person',
      path: '/person',
      component:Person,
      children:[
        {
          name: 'carts',
          path: '/carts',
          component: Carts
        },
        {
          name:'userOrder',
          path:'/userOrder',
          component: userOrder
        },
        {
          name:'invited',
          path:'/invited',
          component: Invited
        },
        {
          name:'persondetail',
          path:'/persondetail',
          component: personDetail
        },
        {
          name: 'order',
          path: '/order',
          component: Order
        }
      ]
    },
    {
      name:'orderNow',
      path:'/orderNow',
      component:OrederNow
    },
    {
      name:'search',
      path:'/search',
      component:Search
    }
  ]
})

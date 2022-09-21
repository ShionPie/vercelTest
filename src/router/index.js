import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken} from '../utils/auth'

Vue.use(VueRouter)
let staticRoutes = [
  {
    path: '/',
    name:'ROOT',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'HOME',
    components:() => import('../view/activeRouter/index'),
  }
]
let routes = {
    test1:() => import('../view/activeRouter/views/test1'),
    test2:() => import('../view/activeRouter/views/test2'),
    sub1:() => import('../view/activeRouter/views/sub/sub1'),
    sub2:() => import('../view/activeRouter/views/sub/sub2')
  }


const router = new VueRouter({
  routes: staticRoutes
})
export {
  routes,
  router
}

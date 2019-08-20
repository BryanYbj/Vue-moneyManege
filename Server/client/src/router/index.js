import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index.vue'
import Register from '../views/Register.vue'
import NotFound from '../views/404.vue'
import Login from '../views/Login.vue'

import Home from '../views/Home.vue'
import Infoshow from '../views/Infoshow.vue'

import FundList from '../views/FundList.vue'
Vue.use(Router)



const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',
    },
    {
      path:'/index',
      component:Index,
      //二级路由
      children:[
        {
        path:'/',
        component:Home,
      },
        {
          path:'/home',
          name:'home',
          component:Home,
        },
        {
          path:'/infoshow',
          name:'infoshow',
          component:Infoshow,
        },
        {
          path:'/fundlist',
          name:'fundlist',
          component:FundList,
        }
      ]
    },
    {
      path:'/register',
      component:Register,
      
      
    },
    {
      path:'/login',
      component:Login,
      
    },
    {
      path:'*',
      component:NotFound,
      
    }
  ]
})

//设置路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.eleToken ? true:false;
  if(to.path =='/login'|| to.path=='/register'){
    next();
  }else{
    isLogin ? next():next('/login');
  }
})

export default router;
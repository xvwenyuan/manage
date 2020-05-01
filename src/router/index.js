import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import VueCookies from 'vue-cookies'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: 'goodslist',
      component: () => import('../views/GoodsList')
    },
    {
      path: 'grouplist',
      component: () => import('../views/GroupList')
    },
    {
      path: 'groupsetting',
      component: () => import('../views/GroupSetting')
    }, {
      path: '/',
      component: () => import('../views/Index'),
    }
    ]
  },
  {
    path: '*',
    redirect:'/home'
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    const token = VueCookies.get('token')
    console.log(token);

    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router

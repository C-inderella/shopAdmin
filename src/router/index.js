import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login.vue'
import home from '@/components/home/home'
import UserList from '@/components/user-list/user-list'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/users',
          component: UserList
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const {path} = to
  if (path !== '/login') { // 如果请求的地址不是 login，则校验登录状态
    const token = window.localStorage.getItem('token')
    // 如果没有 token，则让其跳转到 login
    if (!token) {
      next('/login') // next() 方法中是 字符串
    } else {
      next()
    }
  } else { // 如果是 login，则直接调用 next()
    next()
  }
})

export default router

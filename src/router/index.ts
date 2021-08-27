import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/components/views/Home.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/components/views/auth/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/components/views/auth/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuth = store.getters['auth/isAuth']
  if (['login', 'register'].includes(to.name as string) && isAuth) {
    next('home')
  }
  if (to.name === 'home' && !isAuth) {
    next('login')
  }
  next()
})

export default router

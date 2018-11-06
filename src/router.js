import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Main.vue'),
    },
    {
      path: '/login',
      component: () => import('./views/Login.vue'),
      name: 'login'
    },
    {
      path: '*',
      component: () => import('./views/404.vue'),
      name: '404'
    }
  ]
})

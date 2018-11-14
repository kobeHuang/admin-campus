import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'banner管理',
      component: () => import('./views/Main.vue'),
      redirect: '/banner-list',
      icon: 'icon-tupian1',
      children: [
        {
          path: '/banner-list',
          name: 'banner列表',
          component: () => import('./views/banner/List.vue'),
          meta: {
            module: 'BANNER'
          }
        },
      ]
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

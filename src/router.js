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
      path: '/info',
      name: '资讯管理',
      component: () => import('./views/Main.vue'),
      icon: 'icon-reyonghushujufenxi',
      children: [
        {
          path: '/info/list',
          name: '列表管理',
          component: () => import('./views/info/List.vue'),
          meta: {
            module: 'INFOLIST'
          }
        },
        {
          path: '/info/classify',
          name: '分类管理',
          component: () => import('./views/info/Classify.vue'),
          meta: {
            module: 'INFOCLASSIFY'
          }
        }
      ]
    },
    {
      path: '/life',
      name: '校园生活管理',
      component: () => import('./views/Main.vue'),
      icon: 'icon-xiaoyuan',
      children: [
        {
          path: '/life/list',
          name: '列表管理',
          component: () => import('./views/life/List.vue'),
          meta: {
            module: 'LIFE'
          }
        },
        /*{
          path: '/life/images',
          name: '图片管理',
          component: () => import('./views/life/Images.vue'),
          meta: {
            module: 'LIFEIMAGE'
          }
        }*/
      ]
    },
    {
      path: '/content',
      name: '内容管理',
      component: () => import('./views/Main.vue'),
      icon: 'icon-anjian',
      children: [
        {
          path: '/content/intro',
          name: '学校简介',
          component: () => import('./views/content/Intro.vue'),
          meta: {
            module: 'INTRO'
          }
        },
        {
          path: '/content/menu',
          name: '菜单配置',
          component: () => import('./views/content/Menu.vue'),
          meta: {
            module: 'MENU'
          }
        }
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

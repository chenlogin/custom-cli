import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import Layout from '@/layouts/LayoutDefault.vue'
import HomePage from '@/components/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '',
        component: HomePage,
        name: 'homePage',
      },
    ],
  },
  {
    path: '/about',
    component: Layout,
    meta: {
      title: '关于',
    },
    children: [
      {
        path: '',
        component: () => import('@/components/AboutPage.vue'),
        name: 'aboutPage',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

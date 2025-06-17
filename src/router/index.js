import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/main.vue'),
    },
    {
      path: '/editor/:menu?',
      name: 'editor',
      component: () => import('@/components/editor.vue'),
    },
    {
      path:'/list',
      name:'list',
      component: () => import('@/components/listView.vue')
    }
  ],
})

export default router

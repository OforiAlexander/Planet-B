import { createRouter, createWebHistory } from 'vue-router'
import PlanetDetail from '@/views/PlanetDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import('@/views/HomeView.vue')
    },
    {
      path: '/planet/:name',
      name: 'PlanetDetail',
      component: PlanetDetail,
      props: true
    }
  ]
})

export default router

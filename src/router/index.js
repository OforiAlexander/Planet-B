import { createRouter, createWebHistory } from 'vue-router'

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
      component: ()=> import('@/views/PlanetDetail.vue')
    }
  ]
})

export default router

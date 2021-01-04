import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '../views/Main.vue'
import { trackRouter } from 'vue-gtag-next'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Main
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

trackRouter(router)

export default router

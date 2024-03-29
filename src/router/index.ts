import { trackRouter } from 'vue-gtag-next'
import 'vue-router'
import { createRouter, createWebHistory, type RouterOptions } from 'vue-router'
import MainView from '../views/MainView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
    meta: {
      title:
        'Easy Easings | linear() easing generator & @keyframes editor | Make non-cubic-bezier easings in CSS',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

trackRouter(router)

export default router

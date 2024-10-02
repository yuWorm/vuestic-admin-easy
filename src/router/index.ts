import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import { RouteRecordWithMeta } from '@/router/types'
import { createRouterGuard } from '@/router/guard'

const routes: Array<RouteRecordWithMeta> = []

export function generateRoutes() {
  const routes: RouteRecordWithMeta[] = []

  const routeModules: Record<string, { default?: RouteRecordWithMeta | RouteRecordWithMeta[] }> = import.meta.glob(
    './modules/*.ts',
    {
      eager: true,
    },
  )

  Object.values(routeModules).forEach((module) => {
    const route = module?.default
    if (route) {
      if (Array.isArray(route)) {
        routes.push(...route)
      } else {
        routes.push(route)
      }
    }
  })

  return routes
}

// 将路由加载到路由表中
routes.push(...generateRoutes())

const router = createRouter({
  history: import.meta.env.VITE_IS_HASH_ROUTER
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      window.scrollTo(0, 0)
    }
  },
  routes,
})

createRouterGuard(router)

export default router

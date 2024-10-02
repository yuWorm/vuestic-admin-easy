import type { Router } from 'vue-router'
import { getAccessToken } from '@/utils/auth'

export function setupLoginGuard(router: Router): void {
  router.beforeEach((to, from, next) => {
    const token = getAccessToken()

    if (to.name == 'login') {
      next()
      return
    }

    if (!token) {
      next({
        name: 'login',
      })
      return
    }

    next()
  })
}

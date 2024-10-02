import type { Router } from 'vue-router'
import { setupLoginGuard } from '@/router/guard/loginGuard'

export function createRouterGuard(router: Router) {
  setupLoginGuard(router)
}

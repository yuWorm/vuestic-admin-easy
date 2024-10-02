import { RouteRecordWithMeta } from '@/router/types'

const BASE: RouteRecordWithMeta[] = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'dashboard' },
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/pages/404.vue'),
  },
]

export default BASE

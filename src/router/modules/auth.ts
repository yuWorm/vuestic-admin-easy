import { RouteRecordWithMeta } from '../types'
import AuthLayout from '@/layouts/AuthLayout.vue'

const AUTH: RouteRecordWithMeta = {
  name: 'Auth',
  path: '/auth',
  component: AuthLayout,
  children: [
    {
      name: 'login',
      path: 'login',
      component: () => import('@/pages/auth/Login.vue'),
    },
    {
      name: 'signup',
      path: 'signup',
      component: () => import('@/pages/auth/Signup.vue'),
    },
    {
      name: 'recover-password',
      path: 'recover-password',
      component: () => import('@/pages/auth/RecoverPassword.vue'),
    },
    {
      name: 'recover-password-email',
      path: 'recover-password-email',
      component: () => import('@/pages/auth/CheckTheEmail.vue'),
    },
    {
      path: '',
      redirect: { name: 'login' },
    },
  ],
}

export default AUTH

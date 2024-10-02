import { RouteRecordWithMeta } from '@/router/types'
import AppLayout from '@/layouts/AppLayout.vue'
import RouteViewComponent from '@/layouts/RouterBypass.vue'

const DASHBOARD: RouteRecordWithMeta = {
  path: '/',
  name: 'Dashboard',
  component: AppLayout,
  redirect: { name: 'dashboard' },
  children: [
    {
      name: 'dashboard',
      path: 'dashboard',
      component: () => import('@/pages/admin/dashboard/Dashboard.vue'),
    },
    {
      name: 'settings',
      path: 'settings',
      component: () => import('@/pages/settings/Settings.vue'),
    },
    {
      name: 'preferences',
      path: 'preferences',
      component: () => import('@/pages/preferences/Preferences.vue'),
    },
    {
      name: 'users',
      path: 'users',
      component: () => import('@/pages/users/UsersPage.vue'),
    },
    {
      name: 'projects',
      path: 'projects',
      component: () => import('@/pages/projects/ProjectsPage.vue'),
    },
    {
      name: 'payments',
      path: '/payments',
      component: RouteViewComponent,
      children: [
        {
          name: 'payment-methods',
          path: 'payment-methods',
          component: () => import('@/pages/payments/PaymentsPage.vue'),
        },
        {
          name: 'billing',
          path: 'billing',
          component: () => import('@/pages/billing/BillingPage.vue'),
        },
        {
          name: 'pricing-plans',
          path: 'pricing-plans',
          component: () => import('@/pages/pricing-plans/PricingPlans.vue'),
        },
      ],
    },
    {
      name: 'faq',
      path: '/faq',
      component: () => import('@/pages/faq/FaqPage.vue'),
    },
  ],
}

export default DASHBOARD

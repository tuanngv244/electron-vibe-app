import type { RouteRecordRaw } from 'vue-router/auto'

const emailRouteComponent = () => import('@/pages/base-ui/apps/email/index.vue')

// 👉 Redirects
export const redirects: RouteRecordRaw[] = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/',
    name: 'index',
    redirect: to => {
      // TODO: Get type from backend
      const userData = useAppStorage<Record<string, unknown> | null | undefined>('userData')
      const userRole = userData.value?.role

      if (userRole === 'admin')
        return { name: 'base-ui-dashboards-crm' }
      if (userRole === 'client')
        return { name: 'access-control' }

      return { name: 'login', query: to.query }
    },
  },
  {
    path: '/pages/user-profile',
    name: 'pages-user-profile',
    redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    redirect: () => ({ name: 'base-ui-pages-account-settings-tab', params: { tab: 'account' } }),
  },
  {
    path: '/base-ui/pages/user-profile',
    name: 'base-ui-pages-user-profile',
    redirect: () => ({ name: 'base-ui-pages-user-profile-tab', params: { tab: 'profile' } }),
  },
  {
    path: '/base-ui/pages/account-settings',
    name: 'base-ui-pages-account-settings',
    redirect: () => ({ name: 'base-ui-pages-account-settings-tab', params: { tab: 'account' } }),
  },
]

export const routes: RouteRecordRaw[] = [
  // Email filter
  {
    path: '/base-ui/apps/email/filter/:filter',
    name: 'base-ui-apps-email-filter',
    component: emailRouteComponent,
    meta: {
      navActiveLink: 'base-ui-apps-email',
      layoutWrapperClasses: 'layout-content-height-fixed',
    },
  },

  // Email label
  {
    path: '/base-ui/apps/email/label/:label',
    name: 'base-ui-apps-email-label',
    component: emailRouteComponent,
    meta: {
      // contentClass: 'email-application',
      navActiveLink: 'base-ui-apps-email',
      layoutWrapperClasses: 'layout-content-height-fixed',
    },
  },

  {
    path: '/base-ui/dashboards/logistics',
    name: 'base-ui-dashboards-logistics',
    component: () => import('@/pages/base-ui/apps/logistics/dashboard.vue'),
  },
  {
    path: '/base-ui/dashboards/academy',
    name: 'base-ui-dashboards-academy',
    component: () => import('@/pages/base-ui/apps/academy/dashboard.vue'),
  },
  {
    path: '/base-ui/apps/ecommerce/dashboard',
    name: 'base-ui-apps-ecommerce-dashboard',
    component: () => import('@/pages/base-ui/dashboards/ecommerce.vue'),
  },
]

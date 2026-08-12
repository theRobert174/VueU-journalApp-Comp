import { createRouter, createWebHashHistory } from 'vue-router'

import daybookRouter from '../modules/daybook/router'
import authRouter from '../modules/auth/router'
import isAuthenticatedGuard from '../modules/auth/router/auth-guard'

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/daybook',
    beforeEnter: [isAuthenticatedGuard],
    ...daybookRouter
  },
  {
    path: '/auth',
    ...authRouter
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

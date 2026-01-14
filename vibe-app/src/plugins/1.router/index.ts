import { setupLayouts } from 'virtual:meta-layouts'
import type { App } from 'vue'

import type { RouteRecordRaw } from 'vue-router/auto'

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router/auto'

import { redirects, routes } from './additional-routes'
import { setupGuards } from './guards'

function recursiveLayouts(route: RouteRecordRaw): RouteRecordRaw {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i])

    return route
  }

  return setupLayouts([route])[0]
}

// Use hash mode for Electron to avoid issues with file:// protocol
const isElectron = navigator.userAgent.toLowerCase().includes('electron')

const router = createRouter({
  history: isElectron ? createWebHashHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash)
      return { el: to.hash, behavior: 'smooth', top: 60 }

    return { top: 0 }
  },
  extendRoutes: pages => [
    ...redirects,
    ...[
      ...pages,
      ...routes,
    ].map(route => recursiveLayouts(route)),
  ],
})

setupGuards(router)

export { router }

export default function (app: App) {
  app.use(router)
}

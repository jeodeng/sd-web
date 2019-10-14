import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/views/home'),
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
  },
  {
    path: '/cart',
    component: () => import('@/views/cart'),
  },
  {
    path: '/category',
    component: () => import('@/views/category'),
  },
  {
    path: '/personal',
    component: () => import('@/views/personal'),
  },
  {
    path: '/contact',
    component: () => import('@/views/contact'),
  },
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

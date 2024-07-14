import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active text-primary border-bottom border-primary',
  linkExactActiveClass: 'active text-primary border-bottom border-primary border-3',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bills',
      name: 'bills',
      component: () => import('../views/BillsView.vue')
    },
    {
      path: '/bill/',
      name: 'create-bill',
      redirect: '/bill/new'
    },
    {
      path: '/bill/:id',
      props: true,
      name: 'edit-bill',
      component: () => import('../views/BillCreateEditView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('../views/ClientsView.vue')
    },
    {
      path: '/client/',
      name: 'create-client',
      redirect: '/client/new'
    },
    {
      path: '/client/:id',
      props: true,
      name: 'edit-client',
      component: () => import('../views/ClientCreateEditView.vue')
    },
    
  ]
})

export default router

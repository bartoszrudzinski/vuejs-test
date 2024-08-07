import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../users/UserListView.vue')
    },
    {
      path: '/users/:id',
      name: 'userDetails',
      props: true,
      component: () => import('../users/UserDetailsView.vue')
    },

    {
      path: '/cars',
      name: 'cars',
      component: () => import('../cars/CarListView.vue')
    },
    {
      path: '/cars/new',
      name: 'carCreate',
      component: () => import('../cars/CarDetailsAddView.vue')
    },
    {
      path: '/cars/:id',
      name: 'carDetails',
      props: true,
      component: () => import('../cars/CarDetailsView.vue')
    },
    {
      path: '/cars/:id/edit',
      name: 'carDetailsEdit',
      props: true,
      component: () => import('../cars/CarDetailsEditView.vue')
    }
  ]
})

export default router

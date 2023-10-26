import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    }
  ]
})

export default router

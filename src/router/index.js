import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
 import WhatYourGoal from '../views/WhatYourGoal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/your-goal',
      name: 'your-goal',
      component: WhatYourGoal
    },
  ]
})

export default router

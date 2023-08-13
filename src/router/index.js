import { createRouter, createWebHistory } from 'vue-router'
import levelPhysicalActivity from "../views/levelPhysicalActivity.vue"
import alturaPeso from '../views/Altura-Peso.vue'

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
    }, {
      path: '/levelPhysicalActivity',
      name: 'levelPhysicalActivity',
      component: levelPhysicalActivity
    },
    {
      path: '/height-weight',
      name:'heightWeight',
      component: alturaPeso 
    }
  ]
})

export default router

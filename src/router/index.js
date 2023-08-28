import { createRouter, createWebHistory } from 'vue-router'
import levelPhysicalActivity from "../views/levelPhysicalActivity.vue"
import MenuInferior from '../components/MenuInferior.vue'


// <<<<<<< HEAD
import alturaPeso from '../views/HeightWeight.vue'
// import alturaPeso from '../views/Altura-Peso.vue'
// =======
import HeightWeight from '../views/HeightWeight.vue'
import Age from '../views/Age.vue'
// >>>>>>> c2ad14117889c38b2cf0d0eb586d34c31acd818b

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
      component: HeightWeight 
    },
    {
      path: '/age',
      name:'age',
      component: Age 
    },
    {
      path:'/menuInferior',
      name:'menuInferior',
      component: MenuInferior
    }
    
  ]
})

export default router

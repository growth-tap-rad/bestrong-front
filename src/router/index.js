import { createRouter, createWebHistory } from 'vue-router'
import PhysicalActivityLevel from "../views/PhysicalActivityLevel.vue"
import HeightWeight from '../views/HeightWeight.vue'
import Age from '../views/Age.vue'
import WhatYourGoal from '../views/WhatYourGoal.vue'
import Welcome from '../views/Welcome.vue'
import Diet from '../views/Diet.vue'
import AddWater from "../views/AddWater.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/your-goal',
      name: 'YourGoal',
      component: WhatYourGoal
    }, {
      path: '/physical-activity-level',
      name: 'PhysicalActivityLevel',
      component: PhysicalActivityLevel
    },
    {
      path: '/height-weight',
      name:'HeightWeight',
      component: HeightWeight 
    },
    {
      path: '/age',
      name:'Age',
      component: Age 
    },
    {
      path: '/diet',
      name: 'Diet',
      component: Diet
    },{
      path:"/add-water",
      name: "AddWater",
      component:AddWater
    }
  ]
})

export default router

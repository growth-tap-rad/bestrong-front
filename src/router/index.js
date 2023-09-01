import { createRouter, createWebHistory } from 'vue-router'
import PhysicalActivityLevel from "../views/PhysicalActivityLevel.vue"
import HeightWeight from '../views/HeightWeight.vue'
import Age from '../views/Age.vue'
import WhatYourGoal from '../views/WhatYourGoal.vue'
import Welcome from '../views/Welcome.vue'
import Diet from '../views/Diet.vue'
import AddWater from "../views/AddWater.vue"
import SignIn from '../views/SignIn.vue'
import ForgotPassword from '../views/ForgotPassword.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
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

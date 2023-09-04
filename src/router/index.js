import { createRouter, createWebHistory } from 'vue-router'
import HeightWeight from '../views/HeightWeight.vue'
import GenderBirthday from '../views/GenderBirthday.vue'
import WhatYourGoal from '../views/WhatYourGoal.vue'
import Welcome from '../views/Welcome.vue'
import Diet from '../views/Diet.vue'
import AddWater from '../views/AddWater.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import PhysicalActivityLevel from '../views/PhysicalActivityLevel.vue'
import { useUserStore } from '../stores/user.store'
import { storeToRefs } from 'pinia'

const ROUTES = [
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
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
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
  },
  {
    path: '/height-weight',
    name: 'HeightWeight',
    component: HeightWeight
  },
  {
    path: '/physical-activity-level',
    name: 'PhysicalActivityLevel',
    component: PhysicalActivityLevel
  },
  {
    path: '/gender-birthday',
    name: 'GenderBirthday',
    component: GenderBirthday
  },
  {
    path: '/diet',
    name: 'Diet',
    component: Diet,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-water',
    name: 'AddWater',
    component: AddWater
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
 routes: ROUTES
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth) {
    if (!userStore?.token) {
      router.push('/'); // verify if its the better way

    }
  }
  next()
})

export default router

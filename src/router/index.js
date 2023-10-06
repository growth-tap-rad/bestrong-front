import { createRouter, createWebHistory } from 'vue-router'
import HeightWeight from '../views/HeightWeight.vue'
import GenderBirthday from '../views/GenderBirthday.vue'
import Train from '../views/Train.vue'
import Water from '../views/Water.vue'
import Profile from '../views/Profile.vue'
import WhatYourGoal from '../views/WhatYourGoal.vue'
import Welcome from '../views/Welcome.vue'
import Diet from '../views/Diet.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import PhysicalActivityLevel from '../views/PhysicalActivityLevel.vue'




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
    path: '/train',
    name: 'Train',
    component: Train,
    meta: { requiresAuth: true }
  },
  {
    path:'/water',
    name: 'water',
    component: Water
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: ROUTES
})

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()
//   if (to.meta.requiresAuth) {
//     if (!userStore?.token) {
//       router.push('/'); // verify if its the better way

//     }
//   }
//   next()
// })

export default router

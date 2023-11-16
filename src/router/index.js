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
import ListFoods from '../views/ListFoods.vue'

import CreateEditMeal from '../views/CreateEditMeal.vue'
import InfoFood from '../views/InfoFood.vue'
import CreateEditTrain from '../views/CreateEditTrain.vue'
import InfoExercice from '../views/InfoExercice.vue'
import ListExercises from '../views/ListExercices.vue'

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
    path: '/diet/:date?',
    name: 'Diet',
    component: Diet,
    meta: { requiresAuth: true },
   
  },
  {
    path: '/trains/:date?',
    name: 'Trains',
    component: Train,
    meta: { requiresAuth: true }
  },
  {
    path: '/train/add',
    name: 'TrainAdd',
    component: CreateEditTrain,
    meta: { requiresAuth: true }
  },

  {
    path: '/train/:id/exercises',
    name: 'ListExercices',
    component: ListExercises,
    meta: { requiresAuth: true }
  },
  {
    path: '/train/:id?/exercise/:idexercise',
    name: 'InfoExercice',
    component: InfoExercice,
    meta: { InfoExercice: true }
  },
  {
    path: '/train/:edit(edit)?/:id?',
    name: 'CreateEditTrain',
    component: CreateEditTrain,
    meta: { requiresAuth: true }
  },
  {
    path: '/water',
    name: 'water',
    component: Water,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/meal/:id/foods',
    name: 'ListFoods',
    component: ListFoods,
    meta: { requiresAuth: true }
  },
  {
    path: '/meal/:id/food/:idfood',
    name: 'InfoFood',
    component: InfoFood,
    meta: { requiresAuth: true }
  },
  {
    path: '/meal/:edit(edit)?/:id?',
    name: 'CreateEditMeal',
    component: CreateEditMeal,
    meta: { requiresAuth: true }
  },
  {
    path: '/food/list',
    name: 'listaAlimentos',
    component: ListFoods
  },
  {
    path: '/:pathMatch(.)',
    redirect: '/',
    name: 'notFound',
    component: Welcome
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: ROUTES
})

const isAuthenticated = () => {
  const token = sessionStorage.getItem('accessToken')
  return !!token
}
// Verificar pq ele nao verifica o token, entao mantem o cara logado,
// mesmo o back retornando erro, como nao autorizado
// o front como verifica somente o token no session, em nennum momento este se apaga
// mesmo vencendo o token do back, verificar como fazer isso de uma maneira viavel

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated() && to.path !== '/') {
    return next('/')
  }
  next()
})

export default router

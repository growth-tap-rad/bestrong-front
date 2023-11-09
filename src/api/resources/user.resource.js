import api from '../apiAxios'
import { useAppStore } from '../../stores/app.store'

const showToast = (error) => {
  console.error('Erro: ', error)
  const appStore = useAppStore()
  appStore.setToast({
    show: true,
    message: error.message,
    description: chooseMessage(error)
  })
}

const chooseMessage = (error) => {
  switch (error?.error?.response?.status) {
    case 404:
      return 'Não autorizado'
    case 500:
      return 'Ops, Ocorreu um erro';
    default:
      return error.description || 'Falha de comunicação';
  }
}

export const createTrain = (train) => {
  return api
    .post(`/users/me/trains`, {
      name: train.name,
      goal: train.goal,
      level: train.level,
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const editTrain = (train) => {
  return api
    .put(`/users/me/trains/${train.id}`, {
      name: train.name,
      goal: train.goal,
      level: train.level,
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const findTrain = (id) => {
  return api
    .get(`/users/me/trains/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const fetchExercises = (data) => {
  const query = Object.keys(data)
    .filter((key) => data[key] !== undefined && data[key] !== '')
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)

  const queryString = query.join('&')
  return api
    .get(`/exercises?${queryString}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const getExercise = (id) => {
  return api
    .get(`/exercises/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const getTrainExercise = (id) => {
  return api
    .get(`/trains_exercises/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const createExerciceToTrain = (data) => {
  return api
    .post('/trains_exercises', {
      name: data.name,

      train_id: data.train_id,
      exercise_id: data.exercise_id,
      series: data.series,
      wheight: data.wheight,
      reps: data.reps,
      rest_duration: data.rest_duration,
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const editExerciceToTrain = (data) => {
  return api
    .put(`/trains_exercises/${data.id}`, {

      series: data.series,
      wheight: data.wheight,
      reps: data.reps,
      rest_duration: data.rest_duration,
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const deleteTrain = (id) => {
  return api
    .delete(`/users/me/trains/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const deleteTrainExercise = (id) => {
  return api
    .delete(`/trains_exercises/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}


export const fetchActivitys = () => {
  return api
    .get(`/users/me/trains`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const getMeasure = (id) => {
  return api
    .get(`measures/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const deleteWater = (id) => {
  return api
    .delete(`/users/me/water/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const addWater = (water) => {
  return api
    .post('/users/me/water', {
      consumed_water: water,
      created_at: new Date()
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const createMealFood = (data) => {
  return api
    .post('/meal_food', {
      name: data.name,
      unity: data.unity,
      amount: data.amount,
      quantity: data.quantity,
      food_id: data.food_id,
      meal_id: data.meal_id
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const deleteMealFood = (id) => {

  return api
    .delete(`/meal_food/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const getWater = () => {
  return api
    .get('/users/me/water')
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const fetchFoods = (data) => {
  const query = Object.keys(data)
    .filter((key) => data[key] !== undefined && data[key] !== '')
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)

  const queryString = query.join('&')

  return api
    .get(`/foods?${queryString}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const getFood = (data) => {
  return api
    .get(`/foods/${data}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const addFood = (data) => {
  return api
    .post('users/me/meal/food', {
      meal: data.meal,
      food: data.food
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const editMeal = (meal) => {
  return api
    .put(`users/me/meal/${meal.id}`, {
      name: meal.name,
      meal_consumed_kcal: meal.meal_consumed_kcal,
      meal_consumed_carb: meal.meal_consumed_carb,
      meal_consumed_fat: meal.meal_consumed_fat,
      meal_consumed_protein: meal.meal_consumed_protein
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const createMeal = (meal) => {
  return api
    .post('/users/me/meal', {
      name: meal.name,
      meal_consumed_kcal: meal.meal_consumed_kcal,
      meal_consumed_carb: meal.meal_consumed_carb,
      meal_consumed_fat: meal.meal_consumed_fat,
      meal_consumed_protein: meal.meal_consumed_protein
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const findMeal = (id) => {
  return api
    .get(`users/me/meal/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const deleteMeal = (id) => {
  return api
    .delete(`users/me/meal/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const createProgress = (data) => {
  const { height, weight, activity_level, goal } = data
  return api
    .post('/users/me/progress', {
      height,
      weight,
      activity_level,
      goal
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const getProgress = () => {
  return api
    .get('/users/me/progress')
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const createDiary = () => {
  return api
    .post('/users/me/diary')
    .then((data) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const editDiary = (data) => {
  const {
    name,
    consumed_water,
    remaning_daily_goal_kcal,
    consumed_kcal,
    consumed_carb,
    consumed_fat,
    consumed_protein
  } = data

  return api
    .put('/users/me/diary', {
      name,
      consumed_water,
      remaning_daily_goal_kcal,

      consumed_kcal,
      consumed_carb,
      consumed_protein,
      consumed_fat
    })
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}
export const getDiary = () => {
  return api
    .get('/users/me/diary')
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const getUser = () => {
  return api
    .get('/users/me')
    .then(({ data }) => {
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const verifyEmail = (email) => {
  return api.get(`/users/verify-email?email=${email}`).then(({ data }) => {
    if (data) {
      showToast({
        error: data,
        message: 'Alerta ',
        description: 'Email já em uso!'
      })
      return
    }
    return data
  })
}

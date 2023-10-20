import api from '../apiAxios'


export const getMeasure = (id) => {
  return api
    .get(`measures/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((e) => {

      console.error(e)
    })

}


export const deleteWater = (id) => {
  return api
    .delete(`/users/me/water/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((e) => {

      console.error(e)
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
    .catch((e) => {
      console.error(e)
    })
}
export const createMealFood = (data) => {

  return api
    .post('/meal_foods', {
      name: data.name,
      unity: data.unity,
      quantity: data.quantity,
      food_id: data.food_id,
      meal_id: data.meal_id
    })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {

      console.error(e)
    })

}
export const getWater = () => {
  return api
    .get('/users/me/water')
    .then(({ data }) => {
      return data
    }).catch((e) => {
      console.error(e)
    })
}

export const fetchFood = (data) => {

  return api
    .get(`/foods?page=${data}`)
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.error(e)
    })
}
export const getFood = (data => {
  return api.get(`/foods/${data}`)
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.error(e)
    })
})
export const addFood = (data) => {

  return api
    .post('users/me/meal/food', {
      meal: data.meal,
      food: data.food
    })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.error(e)
    })
}


export const editMeal = (meal) => {
  return api
    .put(`users/me/meal/${meal.id}`, {
      name: meal.name,
      meal_consumed_kcal: meal.meal_consumed_kcal
    })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.error(e)
    })
}
export const createMeal = (meal) => {
  return api
    .post('/users/me/meal', {
      name:meal.name,
    })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.error(e)
    })
}
export const findMeal = (id) => {
  return api
    .get(`users/me/meal/${id}`)
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.error(e)
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
    .catch((e) => {
      console.error(e)
    })
}
export const getProgress = () => {
  return api
    .get('/users/me/progress')
    .then(({ data }) => {
      return data
    }).catch(() => {
    })
}

export const createDiary = () => {
  return api
    .post("/users/me/diary")
    .then((data) => {
      return data
    }).catch((e) => {
      alert('erro a criar Diary')
    })
}
export const editDiary = (data) => {
  const { consumed_water, remaning_daily_goal_kcal } = data
  return api
    .put('/users/me/diary', {
      consumed_water,
      remaning_daily_goal_kcal
    }).then(({ data }) => {
      return data
    }).catch((e) => {
    })
}
export const getDiary = () => {
  return api
    .get('/users/me/diary')
    .then(({ data }) => {
      return data
    }).catch(() => {
      alert("falha ao requisitar Diary ")
    })
}

export const getUser = () => {
  return api
    .get('/users/me')
    .then(({ data }) => {
      return data
    }).catch(() => {
    })
}

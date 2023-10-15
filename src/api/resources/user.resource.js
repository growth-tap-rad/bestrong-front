import api from '../apiAxios'

export const fetchFood = ()=>{
  return api 
  .get('/foods')
  .then(({ data }) => {
    return data
  })
  .catch((e) => {
    console.error(e)
    alert('falha ao fazer fetch Foods')
  })
}

export  const editMeal = (meal)=>{

  return  api

  .put(`users/me/meal/${meal.id}`,{
    name:meal.name
  })
   .then(({ data }) => {
    return data
  })
  .catch((e) => {
    console.error(e)
    alert('falha ao editar refeição')
  })
} 
export const createMeal = (meal) => {
  return api
    .post('/users/me/meal', {
      name: meal
    })
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.error(e)
      alert('falha ao criar refeição')
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
      alert('falha ao buscar refeição')
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
      alert('falha ao criar progresso')
    })
}
export const getProgress = () => {
  return api
    .get('/users/me/progress')
    .then(({ data }) => {
      return data
    }).catch(() => {
      alert("falha ao requisitar Diary ")
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
      alert("falha ao editar Diary")
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
      alert("falha ao requisitar Diary ")
    })
}

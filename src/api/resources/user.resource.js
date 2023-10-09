import api from '../apiAxios'
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

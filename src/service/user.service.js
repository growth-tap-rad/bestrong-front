import api from '../api/apiAxios'

export const getDashboardData = () => {

  return api
    .get('/users/me/tdee')
    .then(({ data }) => {
      return data
    })
    .catch((e) => {
      console.error(e)
      alert('falha ao requisitar dashboard')
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
export const editDiary = (data) => {
  const { water } = data
  return api
    .put('/users/me/edit-diary', {
      water
    }).then(({ data }) => {
      return data
    }).catch((e) => {
      alert("falha ao adicionar água", e)
    })
}
export const getDiary = () => {
  return api
    .get('/users/me/diary')
    .then((data) => {
      console.log(data)
      return data
    }).catch(() => {
      alert("falha ao requisitar Diary ")
    })
}

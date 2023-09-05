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

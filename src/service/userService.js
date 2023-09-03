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

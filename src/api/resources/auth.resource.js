import api from '../apiAxios'
import { useAppStore } from '../../stores/app.store'


export const signIn = (data) => {
  const { email, password } = data
  return api
    .post('/auth/sign-in', {
      email: email.value,
      password: password.value
    })
    .then(({ data }) => {

      sessionStorage.setItem('accessToken', data.accessToken)
      return data
    })
    .catch((err) => {
      console.error("erro ",err.message)
      const appStore = useAppStore()
      appStore.setToast({
        show: true,
        description: err?.response?.data?.message ||  err?.response?.message || 'falha de comunicação',
      })
    })
}

export const signUp = (data) => {
  const { name, email, password, username, birthday, gender } = data

  return api
    .post('auth/sign-up', {
      name: name,
      email: email,
      password: password,
      username: username,
      birthday: birthday,
      gender: gender
    })
    .then(({ data }) => {
      sessionStorage.setItem('accessToken', data.accessToken)
      return data

    })
    .catch((err) => {
      console.error("erro ",err.message)
      const appStore = useAppStore()
      appStore.setToast({
        show: true,
        description: err?.response?.data?.message ||  err?.response?.message || 'falha de comunicação',
      })
    })
}




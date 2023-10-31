import api from '../apiAxios'
import { useAppStore } from '../../stores/app.store'

const showToast = (err) => {
  console.error('erro ', err.error)
  const appStore = useAppStore()
  appStore.setToast({
    show: true,
    message: err.message,
    description: err.description || 'Falha de comunicação'
  })
}

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
      showToast({
        error: err,
        message: 'Alerta',
        description:
          err?.response?.data?.message || err?.response?.message 
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
      showToast({
        error:err,
        message: 'Erro ao efetuar cadastro',
        description:
          err?.response?.data?.message || err?.response?.message 
      })
    })
}

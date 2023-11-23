import api from '../apiAxios'
import { useAppStore } from '../../stores/app.store'
import { useUserStore } from '../../stores/user.store'

const showToast = (err) => {
  if (error) {
    console.error('Erro: ', err)
  }
  const appStore = useAppStore()
  appStore.setToast({
    show: true,
    message: err.message,
    description: chooseMessage(err)
  })
}

const chooseMessage = (error) => {
  switch(error?.error?.response?.status) {
    case 401:
        return 'Não autorizado';
    case 500:
      return 'Ops, Ocorreu um erro';
    default:
      return error.description || 'Falha de comunicação';
  }
}

export const signIn = (data) => {
  const { email, password } = data
  return api
    .post('/auth/sign-in', {
      email: email.value.toLowerCase(),
      password: password.value
    })
    .then(({ data }) => {
      const userStore = useUserStore()
      userStore.setToken(data.accessToken)
      sessionStorage.setItem('accessToken', data.accessToken)
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Alerta',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

export const signUp = (data) => {
  const { name, email, password, username, birthday, gender } = data

  return api
    .post('auth/sign-up', {
      name: name,
      email: email.toLowerCase(),
      password: password,
      username: username,
      birthday: birthday,
      gender: gender
    })
    .then(({ data }) => {
      const userStore = useUserStore()
      userStore.setToken(data.accessToken)
      sessionStorage.setItem('accessToken', data.accessToken)
      return data
    })
    .catch((err) => {
      showToast({
        error: err,
        message: 'Erro ao efetuar cadastro',
        description: err?.response?.data?.message || err?.response?.message
      })
    })
}

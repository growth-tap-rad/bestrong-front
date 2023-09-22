import api from '../api/apiAxios'
/* import { useUserStore } from '../stores/user.store'

const userStore = useUserStore(); */

export const signIn = (data) => {
  const { email, password } = data
  return api
    .post('/auth/sign-in', {
      email: email.value,
      password: password.value
    })
    .then(({ data }) => {
      /* userStore.setToken = data.accessToken */
      sessionStorage.setItem('accessToken', data.accessToken)
      return data
    })
    .catch((e) => {
      console.error(e)
      alert('Email ou senha incorreto')
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

      if (data.accessToken) {
        sessionStorage.setItem('accessToken', data.accessToken)
        return data
      } else {
        console.error(e)
        alert('Erro ao criar sua conta!')
      }
    })
}




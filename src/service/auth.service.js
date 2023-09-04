import api from '../api/apiAxios'

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
    .catch((e) => {
      console.error(e)
      alert('Email ou senha incorreto')
    })
}

export const signUp = (data) => {
  const { name, email, password, username, birthday } = data

  return api
    .post('auth/sign-up', {
      name: name.value,
      email: email.value,
      password: password.value,
      username: username.value,
      birthday: birthday.value
    })
    .then(({ data }) => {
      if (data) {
        sessionStorage.setItem('accessToken', data.accessToken)
        return data
      } else {
        console.error(e)
        alert('Erro ao criar sua conta!')
      }
    })
}

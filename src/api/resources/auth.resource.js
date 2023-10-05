import api from '../apiAxios'
export const signIn = async (data) => {
  const { email, password } = data
  return await api
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

export const signUp = async (data) => {
  const { name, email, password, username, birthday, gender } = data

  return await api
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




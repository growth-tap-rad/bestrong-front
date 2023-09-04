import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: {
      name: '',
      email: '',
      password: '',
      username: '',
      birthday: ''
    }
  }),
  getters: {
    getToken: (state) => state.token,
    getName: (state) => state.user.name,
    getEmail: (state) => state.user.email,
    getPassword: (state) => state.user.password,
    getBirthday: (state) => state.user.birthday
  },
  actions: {
    setUser(payload) {
      this.user = payload
    },
    setToken(payload) {
      this.token = payload
    }
  }
})

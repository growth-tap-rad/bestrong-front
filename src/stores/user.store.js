import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: {
      name: '',
      email: '',
      password: '',
      username: '',
      birthday: '',
      gender: ''
    },
    progress: [{
      height: null,
      weight: null,
      activity_level: '',
      goal: '',
    }]
  }),
  getters: {
    getToken: (state) => state.token,
    getName: (state) => state.user.name,
    getEmail: (state) => state.user.email,
    getPassword: (state) => state.user.password,
    getUsername: (state) => state.user.username,
    getBirthday: (state) => state.user.birthday,
    getGender: (state) => state.user.gender
  },
  actions: {
    setToken(payload) {
      this.token = payload
    },
    setUser(payload) {
      this.user = payload
    },
    setProgress(payload) {
      this.progress = payload
    },
    setBirthday(payload) {
      this.user.birthday = payload
    },
    setGender(payload) {
      this.user.gender = payload
    },
    setHeight(payload) {
      this.progress.height = payload
    },
    setWeight(payload) {
      this.progress.weight = payload
    },
    setActivity_level(payload) {
      this.progress.activity_level = payload
    },
    setGoal(payload) {
      this.progress.goal = payload
    },
  }
})

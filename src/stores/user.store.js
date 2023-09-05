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
    getLastProgress: (state) => state.progress[state.progress.length - 1],
    getUser: (state) => state.user,
    getName: (state) => state.user.name,
    getEmail: (state) => state.user.email,
    getPassword: (state) => state.user.password,
    getUsername: (state) => state.user.username,
    getBirthday: (state) => state.user.birthday,
    getGender: (state) => state.user.gender,

    getLastProgressPosition: (state) => state.progress.length - 1
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
      this.progress[this.getLastProgressPosition].height = payload
    },
    setWeight(payload) {
      this.progress[this.getLastProgressPosition].weight = payload
    },
    setActivity_level(payload) {
      this.progress[this.getLastProgressPosition].activity_level = payload
    },
    setGoal(payload) {
      this.progress[this.getLastProgressPosition].goal = payload
    },
  }
})

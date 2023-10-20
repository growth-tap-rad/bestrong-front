import { defineStore } from 'pinia'
import * as authResource from '../api/resources/auth.resource'
import * as userResource from '../api/resources/user.resource'

const defaultState = {}
export const useHeightWeightStore = defineStore('heightweight', {
  state: () => ({ ...defaultState }),
  getters: {},
  actions: {
    async signUp(payload) {
      return await authResource.signUp(payload)
    },
    async createProgress(payload) {
      return await userResource.createProgress(payload)
    },
    async createDiary() {
      return await userResource.createDiary()
    },
    async createMeals() {
      await userResource.createMeal({ name: 'Café da manhã' })
      await userResource.createMeal({ name: 'Almoço' })
      await userResource.createMeal({ name: 'Lanche' })
      await userResource.createMeal({ name: 'Jantar' })
      return
    }
  }
})

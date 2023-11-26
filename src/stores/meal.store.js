import { defineStore } from 'pinia'
import * as userResource from '../api/resources/user.resource'

const defaultState = {
  meal: [
    {
      id: '',
      name: '',
      meal_consumed_kcal: 0,
      food: []
    }
  ]
}
export const useMealStore = defineStore('meal', {
  state: () => ({ ...defaultState }),
  getters: {
    getMeals: (state) => state.meal
  },

  actions: {
    async createMeal(payload) {
      return await userResource.createMeal(payload)
    },
    setMeal(payload) {
      this.meal.push(payload)
    },
    async findMeal(payload) {
      this.setMeal(await userResource.findMeal(payload))
      return await userResource.findMeal(payload)
    },
    async editMeal(payload) {
      return await userResource.editMeal(payload)
    },
    async addFood(payload) {
      return await userResource.addFood(payload)
    },
    async deleteMeal(payload) {
      return await userResource.deleteMeal(payload)
    },
  }
})

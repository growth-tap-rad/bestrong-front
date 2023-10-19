import { defineStore } from "pinia";
import * as userResource from '../api/resources/user.resource';

const defaultState = {
  food: {}

}
export const useFoodStore = defineStore('food', {

  state: () => ({ ...defaultState }),
  getters: {
    getFoods: (state) => state.food,
  },

  actions: {

    async fetchFood(payload) {
      this.setFoods(await userResource.fetchFood(payload))
      this.getFoods

    },
    async getFood(payload) {
      return await userResource.getFood(payload)
    },
    async getMeasure(payload) {
      return await userResource.getMeasure(payload)
    },
    setFoods(payload) {
      this.food = payload
    },
    async createMealFood(payload) {
      return await userResource.createMealFood(payload)
    }

  }
})

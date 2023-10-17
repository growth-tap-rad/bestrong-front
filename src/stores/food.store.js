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

    setFoods(payload) {
      this.food = payload
    }

  }
})

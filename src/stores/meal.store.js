import { defineStore } from "pinia";
import * as userResource from '../api/resources/user.resource';

const defaultState = {
  meal: [
    {
      name: "",
      meal_consumed_kcal: 0
    }
  ]


}
export const useMealStore = defineStore('meal', {

  state: () => ({ ...defaultState }),
  getters: {
    getMeals: (state) => state.meal,
  },

  actions: {
    async createMeal(payload) {
      this.setMeal(await userResource.createMeal(payload))
      return this.getMeals
    },
    setMeal(payload) {
      this.meal.push({ name: payload.name })
    }

  }
})

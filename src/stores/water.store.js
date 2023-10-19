import { defineStore } from "pinia";
import * as userResource from '../api/resources/user.resource';

const defaultState = {
  water: [
    { consumed_water: 0 }
  ],
  water_goal: 0
}

export const useWaterStore = defineStore('water', {

  state: () => ({ ...defaultState }),

  getters: {
    getArrayWater: (state) => state.water,
    getWaterGoal: (state) =>state.water_goal
  },
  actions: {

    addWater(payload) {
      return userResource.addWater(payload)
    },

    deleteWater(payload) {
      return userResource.deleteWater(payload)
    },

    getWater() {
      return userResource.getWater()
    },
    async fetchWater() {
      this.setWater(await userResource.getWater())
      const goal = await userResource.getDiary()
      this.water_goal = (goal.progress.weight)* 35
    },

    setWater(payload) {
      this.water = payload
    },
  }

})
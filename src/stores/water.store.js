import { defineStore } from "pinia";
import * as userResource from '../api/resources/user.resource';

const defaultState = {
  waterList: [],
  water_goal: 0
}

export const useWaterStore = defineStore('water', {

  state: () => ({ ...defaultState }),

  getters: {
    getArrayWater: (state) => state.waterList,
    getWaterGoal: (state) => state.water_goal
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
    async fetchWater(date) {
      this.setWaterList(await userResource.getWater(date))

      const goal = await userResource.getDiary()
      console.log(goal)
      this.water_goal = (goal.user.progress[goal.user.progress.length - 1 || 0].weight) * 35
    },

    setWaterList(payload) {
      this.waterList = payload
    },
  }

})
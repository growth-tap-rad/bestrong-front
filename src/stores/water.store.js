import { defineStore } from "pinia";
import * as userResource from '../api/resources/user.resource';

const defaultState = {
  water: [
    { consumed_water: 0 }
  ]
}

export const useWaterStore = defineStore('water', {

  state: () => ({ ...defaultState }),

  getters: {
    getArrayWater: (state) => state.water
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
    },

    setWater(payload) {
      this.water = payload
    },
  }

})
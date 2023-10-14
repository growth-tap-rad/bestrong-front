
import { defineStore } from "pinia";
import * as userResource from '../api/resources/user.resource';
const defaultState = {
  diary: {

    remaning_daily_goal_kcal: 0,
    burned_kcal: 0,
    consumed_kcal: 0,
    consumed_carb: 0,
    consumed_protein: 0,
    consumed_fat: 0,
    consumed_water: 0,
    meal: {
      item: {
        name: "",
        meal_consumed_kcal: 0
      },
    }
    ,
    progress: {
      height: 0,
      weight: 0,
      activity_level: "low",
      goal: "gain",
      daily_goal_kcal: 0,
      carb: 0,
      protein: 0,
      fat: 0,
      created_at: "2023-10-04T02:13:00.360Z",
      updated_at: "2023-10-04T02:13:00.360Z"

    }
  }
}

export const useDietStore = defineStore('diet', {
  state: () => ({ ...defaultState }),
  getters: {
    getDiary: (state) => state.diary,
    getMeals: (state) => state.diary.meal,
  },

  actions: {

    async editDiary(payload) {
      this.setDiary(await userResource.editDiary(payload))
      return this.getDiary
    },
    async fetchDiary() {
      this.setDiary(await userResource.getDiary())
    },

    setDiary(payload) {
      this.diary = payload
    },
    setConsumedWater(payload) {
      this.diary.consumed_water = payload
    }
  },

})
import { defineStore } from "pinia";
import * as userResource from '../api/resources/user.resource';
const defaultState = {

}
export const useProfileStore = defineStore('profile', {
  state: () => ({ ...defaultState }),

  getters: {

  },
  actions: {
    getProgress() {
      return userResource.getProgress()
    }
  }
})
import { defineStore } from "pinia";
import * as authResource from '../api/resources/auth.resource';
import * as userResource from '../api/resources/user.resource';

const defaultState = {

}
export const useHeightWeightStore = defineStore('heightweight', {
  state: () => ({ ...defaultState }),
  getters: {

  },
  actions: {
    async signUp(payload) {
      console.log("entrou no signUp")
      return await authResource.signUp(payload)
    },
    async createProgress(payload) {
      console.log("entrou no createProgress")
      return await userResource.createProgress(payload)
    },
    async createDiary() {
      console.log("entrou no createDiary")
     return await userResource.createDiary()
    }
  }
})
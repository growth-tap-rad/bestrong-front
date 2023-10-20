import { defineStore } from "pinia";
import * as authResource from '../api/resources/auth.resource'

const defaultState = {

}
export const useSignInStore = defineStore('signin', {
  state: () => ({ ...defaultState }),
  getters: {
  },
  actions: {
    signIn(payload) {
      return authResource.signIn(payload)
    },
  }
})
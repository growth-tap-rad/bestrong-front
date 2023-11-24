import { defineStore } from 'pinia'
import * as userResource from '../api/resources/user.resource'
const defaultState = {
  activity_values: {
    low: 'Baixa',
    moderate: 'Moderada',
    intense: 'Intensa'
  },
  goal_values: {
    maintain: 'Manter peso',
    lose: 'Perder peso',
    gain: 'Ganhar peso'
  }
}

export const useProfileStore = defineStore('profile', {
  state: () => ({ ...defaultState }),

  getters: {
  },
  actions: {
    getProgress() {
      return userResource.getProgress()
    },
    getUser() {
      return userResource.getUser()
    },
    getActivityLevelPt(level){
      return this.activity_values[level]
    },
    getGoalPt(goal){
      return this.goal_values[goal]
    },
    putUploadImageProfile(file){
        return userResource.putUploadImageProfile(file)
    }
  }
})

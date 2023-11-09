import { defineStore } from 'pinia'
import * as userResource from '../api/resources/user.resource'

const defaultState = {
  exercises: {}
}


export const useExerciseStore = defineStore('exercise', {
  state: () => ({ ...defaultState }),
  getters: {
    getExercises: (state) => state.exercises
  },

  actions: {
    async fetchExercises(payload) {
      this.exercises = await userResource.fetchExercises(payload)
    },
    async getExercise(payload) {
      return await userResource.getExercise(payload)
    },
    async getTrainExercise(payload) {
      return await userResource.getTrainExercise(payload)
    },
    async createExerciceToTrain(payload) {
      return await userResource.createExerciceToTrain(payload)
    },
    async editExerciceToTrain(payload) {
      return await userResource.editExerciceToTrain(payload)
    }

  }

})

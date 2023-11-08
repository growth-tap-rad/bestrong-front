import { defineStore } from 'pinia'
import esteira from '@/assets/imgs/esteira.jpeg'
import sedentarismo from '@/assets/imgs/sedentarismo.jpg'
import * as userResource from '../api/resources/user.resource'

const defaultState = {
  activitys: [
    {
      title: 'CARDIO',
      minutes: 50,
      exercisesQty: 10,
      img: esteira,
      exercises: ['Biceps', 'Peito']
    },
    {
      title: 'CARDIO2',
      minutes: 50,
      exercisesQty: 10,
      img: sedentarismo
    }
  ]
}

export const useTrainStore = defineStore('train', {
  state: () => ({ ...defaultState }),
  getters: {
    getActivitys: (state) => state.activitys
  },
  actions: {
    async fetchActivitys() {
      this.activitys = await userResource.fetchActivitys()
    },
    async createTrain(payload) {
      return await userResource.createTrain(payload)
    },
    async findTrain(payload) {
      return await userResource.findTrain(payload)
    },
    async editTrain(payload) {
      return await userResource.editTrain(payload)
    }
  }
})

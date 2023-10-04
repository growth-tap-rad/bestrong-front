import { defineStore } from 'pinia'
import esteira from '@/assets/imgs/esteira.jpeg';
import sedentarismo  from '@/assets/imgs/sedentarismo.jpg'

const defaultState = {
  activitys: [
    {
      title: 'CARDIO',
      minutes: 50,
      exercisesQty: 10,
      img: esteira,
      exercises: ["Biceps", "Peito"]
    },
    {
      title: 'CARDIO2',
      minutes: 50,
      exercisesQty: 10,
      img: sedentarismo,
    },
  ]


}

export const useTrainStore = defineStore('train', {

  state: () => ({ ...defaultState }),
  getters: {
    getActivitys: (state) => state.activitys

  },
  actions: {

  }


})
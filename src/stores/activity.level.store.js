import { defineStore } from "pinia";
import low from '@/assets/imgs/ActivityLevel-low.jpg';
import moderate from '@/assets/imgs/ActivityLevel-moderate.jpg';
import intense from '@/assets/imgs/ActivityLevel-intense.png';

const defaultState = {
  activitys: [
    {
      title: 'Baixa',
      text: 'Treina 3 vezes na semana ou menos.',
      bg: low,
      value: 'low',
      selected: false
    },
    {
      title: 'Moderada',
      text: 'Treina 3 ou 4 vezes na semana.',
      bg: moderate,
      value: 'moderate',
      selected: false
    },
    {
      title: 'Intensa',
      text: 'Treina todos ou quase todos os dias.',
      bg: intense,
      value: 'intense',
      selected: false
    }
  ]


}

export const useActivityStore = defineStore('activity', {
  state: () => ({ ...defaultState }),
  getters: {
    getActivitys: (state) => state.activitys
  }
})
import { defineStore } from "pinia";
import deaflift from '@/assets/imgs/deadlift.jpeg';
import crossfit from '@/assets/imgs/crossfit.jpg';
import gym from '@/assets/imgs/gym.jpeg';

const defaultState = {
  goals: [
    {
      title: "Manter peso",
      text: "Vamos te ajudar a equilibrar a alimentação com exercícios para manter.",
      bg: deaflift,
      value: 'maintain',
      selected: false
    }, {
      title: "Perder peso",
      text: "Ajudaremos com as informações do que precisa comer para organizar sua dieta.",
      bg: crossfit,
      value: 'lose',
      selected: false
    },

    {
      title: "Ganhar peso",
      text: "Vamos te ajudar a organizar o que você precisa comer para ganhar massa.",
      bg: gym,
      value: 'gain',
      selected: false
    },

  ]
}

export const useGoalStore = defineStore('goal', {
  state: () => ({ ...defaultState }),
  getters: {
    getGoals: (state) => state.goals
  }
})
import { defineStore } from 'pinia'
import * as userResource from '../api/resources/user.resource'

const defaultState = {
  food: {}
}

const UNITS = [
  {
    text: 'grama',
    value: 'Gramas',
    multiple: true
  },
  { text: 'unidade', value: 'Unidade', multiple: true },
  {
    text: 'mililitro',
    value: 'Ml',
    multiple: true
  },
  {
    text: 'scoop',
    value: 'Gramas',
    multiple: true
  },
  {
    text: 'barra',
    value: 'Gramas',
    multiple: true
  },
  {
    text: 'comprimido',
    value: 'Unidade',
    multiple: false
  },
  {
    text: 'capsulas',
    value: 'Unidade',
    multiple: false
  }
]

export const useFoodStore = defineStore('food', {
  state: () => ({ ...defaultState }),
  getters: {
    getFoods: (state) => state.food
  },

  actions: {
    async fetchFood(payload) {
      this.setFoods(await userResource.fetchFood(payload))
      this.getFoods
    },
    async getFood(payload) {
      return await userResource.getFood(payload)
    },
    async getMeasure(payload) {
      return await userResource.getMeasure(payload)
    },
    async createMealFood(payload) {
      return await userResource.createMealFood(payload)
    },
    setFoods(payload) {
      this.food = payload
    },
    transformUnity(payload, resumed = false) {
      const unity = payload.toLowerCase()
      let measure = ''

      UNITS.forEach((el) => {
        if (unity.includes(el.text.toLowerCase())) {
          measure = el.value
        }
      })
      if(resumed){
        const measureArray = measure.split("");
        return measureArray[0].toLowerCase() || 'g'
      }
      return measure || 'Gramas'
    },
    transformQuantity(qtd, amount, desc) {
      const DESC = desc.toLowerCase()
      let quantity = qtd

      UNITS.forEach((el) => {
        if (DESC.includes(el.text.toLowerCase())) {
          if (el.multiple) {
            quantity = qtd * parseInt(amount)
          }
        }
      })
  
      return quantity
    }
  }
})

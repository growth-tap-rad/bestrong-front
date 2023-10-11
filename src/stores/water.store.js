import { defineStore } from "pinia";
import * as userResource from '../api/resources/user.resource';

const defaultState = {
 water: [
  {consumed_water: 0}
]
}

export const useWaterStore = defineStore('water', {

    state: () => ({ ...defaultState }),

    getters: {
       getArrayWater:(state) => state.water
    //   getDiary: (state) => state.diary,
    // getMeals: (state) => state.diary.meal,
    },
    actions: {
        // pegar o valor da agua e mandar para o back

        // store é ocontroler e o userResource é minha service
        addWater(payload) {
        return userResource.addWater(payload)

        //unico componente que faz as requisções (fetchs) é o userResource
      }, 

      //criar uma função para buscar uma água armazenada

      getWater(){
        return userResource.getWater()
      },
      async fetchWater(){
        this.setWater(await userResource.getWater())
      },
      // async fetchDiary() {
      //   this.setDiary(await userResource.getDiary())
      // }

      setWater(payload) {
        this.water = payload
      },
    }
   
})
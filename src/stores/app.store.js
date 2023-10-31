import { defineStore } from "pinia";

const defaultState = {
  toast: {
    show: false,
    message:'Erro',
    description: 'Algo deu errado.'
  }

}

export const useAppStore = defineStore('app', {
  state: () => ({ ...defaultState }),
  getters: {
    getToastShow: (state) => state.toast.show,
    getMessage:(state) => state.toast.message,
    getToastDescription: (state) => state.toast.description
  },

  actions: {
    setToast(payload) {
      this.toast = payload
    },
    setToastShow(payload) {
      this.toast.show = payload
    }
  }
})
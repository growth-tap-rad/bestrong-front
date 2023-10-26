import { defineStore } from "pinia";

const defaultState = {
  toast: {
    show: false,
    description: 'Algo deu errado.'
  }

}

export const useAppStore = defineStore('app', {
  state: () => ({ ...defaultState }),
  getters: {
    getToastShow: (state) => state.toast.show,
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
import { defineStore } from 'pinia'

const defaultState = {
  toast: {
    show: false,
    message: 'Erro',
    description: 'Algo deu errado.'
  },
  currentDateSearch: {
    date: new Date(),
    year: '',
    month: '',
    day: ''
  },
  currentQueryDate: ''
}

export const useAppStore = defineStore('app', {
  state: () => ({ ...defaultState }),
  getters: {
    getToastShow: (state) => state.toast.show,
    getMessage: (state) => state.toast.message,
    getToastDescription: (state) => state.toast.description,
    getCurrentDateSearch: (state) => state.currentDateSearch,
    getCurrentQueryDate: (state) => state.currentQueryDate
  },

  actions: {
    setToast(payload) {
      this.toast = payload
    },
    setToastShow(payload) {
      this.toast.show = payload
    },
    setCurrentDateSearch(payload) {
      this.currentDateSearch = payload
    },
    setCurrentQueryDate(payload) {
      this.currentQueryDate = payload
    },
    updateCurrentDate(date) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getUTCDate() + 1);
    
      const year = newDate.getUTCFullYear();
      const month = newDate.getUTCMonth() + 1;
      const day = newDate.getUTCDate();
    
      if (newDate.getUTCMonth() + 1 !== month) {
        this.currentDateSearch.month = month;
      }
    
      this.currentDateSearch = { ...this.currentDateSearch, date: newDate, year, day };
    },
    decrementCurrentDateSearchDay() {  
      if (this.currentDateSearch.day > 1) {
        this.currentDateSearch.day--;
      } else {
        const lastDayOfPreviousMonth = this.getLastDayOfPreviousMonth(this.currentDateSearch.date);
        this.currentDateSearch.day = lastDayOfPreviousMonth;
    
        const newDate = new Date(this.currentDateSearch.date);
        newDate.setMonth(newDate.getUTCMonth() - 1);
    
        if (newDate.getUTCFullYear() !== this.currentDateSearch.year) {
          this.currentDateSearch.year = newDate.getUTCFullYear();
        }
    
        this.currentDateSearch.month = newDate.getUTCMonth() + 1;
      }
     
      this.updateCurrentQueryDate();
    },
    
    incrementCurrentDateSearchDay() {
      const lastDayOfMonth = this.getLastDayOfMonth(this.currentDateSearch.date);
    
      if (this.currentDateSearch.day < lastDayOfMonth) {
        this.currentDateSearch.day++;
      } else {
        this.currentDateSearch.day = 1;
    
        const newDate = new Date(this.currentDateSearch.date);
        newDate.setMonth(newDate.getUTCMonth() + 1);
  
        if (newDate.getUTCFullYear() !== this.currentDateSearch.year) {
          this.currentDateSearch.year = newDate.getUTCFullYear();
        }
    
        this.currentDateSearch.month = newDate.getUTCMonth() + 1;
      }
     
      this.updateCurrentQueryDate();
    },
    getLastDayOfMonth(date) {
      const nextMonth = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)
      return nextMonth.getUTCDate()
    },
    getLastDayOfPreviousMonth(date) {
      const lastMonth = new Date(date.getUTCFullYear(), date.getUTCMonth(), 0)
      return lastMonth.getUTCDate()
    },
    updateCurrentQueryDate() {
      const { year, month, day } = this.currentDateSearch
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`
      this.currentQueryDate = formattedDate
    },
    setCurrentDayToDateSearch(searchDate) {
      const currentDate = searchDate ? new Date(searchDate) : new Date()
      currentDate.setUTCHours(0, 0, 0, 0)

      const year = currentDate.getUTCFullYear()
      const month = currentDate.getUTCMonth() + 1
      const day = currentDate.getUTCDate()

      this.setCurrentDateSearch({ date: currentDate, year, month, day })

      const formattedDate = searchDate
        ? searchDate
        : `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

      this.currentQueryDate = formattedDate
    }
  }
})

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAppStore } from '../stores/app.store'

const router = useRouter()

const appStore = useAppStore()

const props = defineProps({
  title: {
    type: String,
    default: "Diário",
  },
  actions: {
    type: Array,
    default: () => []
  },
  isDateDiet: {
    type: Boolean,
    default: false
  }
})

const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const currentDate = appStore?.getCurrentDateSearch.date

const dayOfWeek = daysOfWeek[currentDate.getDay()];
const dayOfMonth = currentDate.getDate();
const month = months[currentDate.getMonth()];

const formattedDate = ref(`${dayOfWeek}, ${dayOfMonth} de ${month}`);

const fetching = ref(false)

const goTo = async (route, back = false) => {
  if (!route) {
    return
  }
  if (route === 'back') {
    router.back()
    return
  }

  if (!props.isDateDiet) {
    router.push(route)
  }

  if (appStore.getCurrentDateSearch) {
    fetching.value = true
    if (back) {
      appStore.decrementCurrentDateSearchDay()
    }
    else {
      appStore.incrementCurrentDateSearchDay()
    }

    appStore.updateCurrentDate(appStore.getCurrentQueryDate)
    await router.push('/trains')
    await router.push({ name: 'Diet', params: { date: appStore.getCurrentQueryDate } })
    fetching.value = false
  }

}

const debounce = (func, delay) => {
  let timerDebounce;

  return (...args) => {
    if (timerDebounce) {
      clearTimeout(timerDebounce);
    }
    timerDebounce = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

}

const debounceGoTO = debounce(goTo, 600)

</script>

<template>
  <nav class="box-title-date">
    <i class="icon" :class="actions[0].btIcon ? actions[0].btIcon : 'bi bi-chevron-left'" v-if="actions[0]"
      @click="debounceGoTO(actions[0].goTo, true)"></i>
    <div class="center">
      <h3 class="title">{{ title }}</h3>
      <p class="date mb-0">{{ formattedDate.toUpperCase() }}</p>
    </div>
    <i class="icon" :class="actions[1].btIcon ? actions[1].btIcon : 'bi bi-chevron-right'" v-if="actions[1]"
      @click="debounceGoTO(actions[1].goTo, false)"></i>
  </nav>
</template>

<style scoped>
.box-title-date {

  background-color: var(--bg-color-dark2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: center;
  padding: 15px 15px;

  .center {
    margin: 0 auto;
  }

  .icon {
    padding: 10px;
    font-size: 20px;
    color: var(--text-color-light2);
  }

  .title {
    color: var(--text-color-light);
  }

  .date {
    color: var(--bg-color-grey2);
  }
}
</style>
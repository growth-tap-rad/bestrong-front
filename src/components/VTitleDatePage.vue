<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

defineProps({
  title: {
    type: String,
    default: "Diário",
  },
  actions: {
    type: Array,
    default: () => []
  },
})

const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const currentDate = new Date();

const dayOfWeek = daysOfWeek[currentDate.getDay()];
const dayOfMonth = currentDate.getDate();
const month = months[currentDate.getMonth()];

const formattedDate = `${dayOfWeek}, ${dayOfMonth} de ${month}`;

const goTo = (route) => {
  if (!route) {
    return
  }
  if (route === 'back') {
    router.back()
    return
  }
  router.push(route)
}

</script>

<template>
  <nav class="box-title-date">
    <i class="icon" :class="actions[0].btIcon ? actions[0].btIcon : 'bi bi-chevron-left'" v-if="actions[0]"
      @click="goTo(actions[0].goTo)"></i>
    <div class="center">
      <h3 class="title">{{ title }}</h3>
      <p class="date mb-0">{{ formattedDate.toUpperCase() }}</p>
    </div>
    <i class="icon" :class="actions[1].btIcon ? actions[1].btIcon : 'bi bi-chevron-right'" v-if="actions[1]"
      @click="goTo(actions[1].goTo)"></i>
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
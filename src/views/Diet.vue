<script setup>
import VAccordionMeal from '../components/VAccordionMeal.vue';
import VDashboardDiet from '../components/VDashboardDiet.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';
import { onMounted } from 'vue'
import * as userService from '../service/user.service.js';
import { reactive } from 'vue';

// TODO Fetch to get this datas...
const dashInfo = {
  consumed: 0,
  burned: 0,
  goal: 0
}
const meals = {
  item1: {
    title: "Café da tarde",
    isWater: false,
    quantity: "40",
    items: [
      { name: 'Abacate', quantity: '10g' },
      { name: 'Iogurte', quantity: '400ml' }]
  },
  item2: {
    title: "Agua",
    isWater: true,
    quantity: "140",
  }
}

const macros = {
  protein: {
    now: 0,
    total: 0
  },
  carb: {
    now: 0,
    total: 0
  },
  fat: {
    now: 0,
    total: 0
  }
}
</script>

<template>
  <section class="diet">
    <header class="header">
      <VTitleDatePage />
    </header>
    <main class="main">
      <VDashboardDiet :dashInfo="dashInfo" :macros="macros" />

      <div class="box-ingredients" v-for="meal in meals">
        <VAccordionMeal class="meal" :data="meal" />
      </div>

    </main>
  </section>
</template>

<style scoped>
.diet {
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .main {
    width: 100%;

    .box-ingredients {
      margin-top: 10px;

      .meal {
        padding: 5px 20px;
      }
    }

  }
}
</style>
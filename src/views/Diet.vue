<script setup>
import VAccordionMeal from '../components/VAccordionMeal.vue';
import VDashboardDiet from '../components/VDashboardDiet.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';
import { onMounted } from 'vue'
import * as userService from '../service/userService';
import { reactive } from 'vue';


const dashData = reactive({
  consumed: 0,
  burned: 0,
  goal: 0
})


const macros = reactive({
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
})

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

onMounted(() => {
  fetchDashboardData();
})

function fetchDashboardData() {
  userService.getDashboardData().then(data => {
    if (data) {
      const { daily_goal } = data;
      dashData.goal = Math.round(daily_goal);

      const protein = data.macros?.protein;
      const carb = data.macros?.carb;
      const fat = data.macros?.fat;

      macros.protein.total = protein;
      macros.carb.total = carb;
      macros.fat.total = fat;
    }
  })
}

</script>

<template>
  <section class="diet">
    <header class="header">
      <VTitleDatePage />
    </header>
    <main class="main">
      <VDashboardDiet :dashInfo="dashData" :macros="macros" />

      <div class="box-ingredients">
        <VAccordionMeal class="meal" :data="meal" v-for="meal in meals"/>
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
      margin-top: 30px;

      .meal {
        padding: 5px 20px;
        margin: 0 0 10px 0;
      }
    }

  }
}
</style>
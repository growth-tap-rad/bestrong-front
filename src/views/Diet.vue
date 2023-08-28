<script setup>
import VAccordionMeal from '../components/VAccordionMeal.vue';
import VDashboardDiet from '../components/VDashboardDiet.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';

// TODO Fetch to get this datas...
const dashInfo = {
  consumed: 0,
  burned: 0,
  goal: 0
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

      <div class="box-ingredients">
        <VAccordionMeal class="meal" title="Agua" :isWater="true" quantity="200"/>
        <VAccordionMeal class="meal" title="Café da tarde" :isWater="false" quantity="100"
          :items="[{ name: 'bacate', quantity: '10g' },{ name: 'iorgute', quantity: '400ml' }]" />
      </div>

    </main>
  </section>
</template>

<style scoped>
.diet {
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100vh;
 /*  height: 100%;
  min-height: 100vh; */
  display: flex;
  flex-direction: column;



  .main {
    width: 100%;

    .box-ingredients {

      margin-top: 50px;


      .meal {
        padding: 5px 20px;
      }
    }

  }
}
</style>
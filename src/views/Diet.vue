<script setup>
import VAccordionMeal from '../components/VAccordionMeal.vue';
import VDashboardDiet from '../components/VDashboardDiet.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';
import VAddWater from '../components/VAddWater.vue';
import { onMounted } from 'vue'
import * as userService from '../service/user.service.js';
import Menunferior from '../components/MenuInferior.vue'
import { reactive, ref } from 'vue';
import { Alert } from 'bootstrap';

const showComponentAddWater = ref(false)
const dashData = reactive({
  consumed: 0,
  burned: 0,
  goal: 0,
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
  /*   item1: {
      title: "Café da tarde",
      isWater: false,
      quantity: "40",
      items: [
        { name: 'Abacate', quantity: '10g' },
        { name: 'Iogurte', quantity: '400ml' }]
    }, */
  item: {
    title: "Agua",
    isWater: true,
    quantity: ref(0),
  }
}

onMounted(() => {

  fetchDashboardData();
  fetchDiaryData()

})
function showAddWater() {
  showComponentAddWater.value = true
}
async function addWater(e) {
  showComponentAddWater.value = false
  await userService.editDiary({ water: e }).then((data)=>{
    meals.item.quantity.value = data.water
  })

}

function fetchDiaryData() {

  userService.getDiary().then((data) => {
    console.log(data)
    meals.item.quantity.value = data.water 
  })
}
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
        <VAccordionMeal @showAddWater="() => showAddWater()" class="meal" :data="meal" v-for="meal in meals" />
      </div>
      <VAddWater class="box-add-water" :show="showComponentAddWater" @showAddWater="(e) => { addWater(e) }"></VAddWater>
      <Menunferior class="footer" />
    </main>

  </section>
</template>

<style scoped>
.box-add-water {
  position: fixed;
    bottom: 0;
  z-index: 4;

}

.diet {
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .main {
    width: 100%;



    .footer {
      position: fixed;
      z-index: 3;
      width: 100%;
      bottom: 0;

    }

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
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useDietStore } from '../stores/diet.store';
import VAccordionMeal from '../components/VAccordionMeal.vue';
import VDashboardDiet from '../components/VDashboardDiet.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';
import VAddWater from '../components/VAddWater.vue';
import VBottomMenu from '../components/VBottomMenu.vue'

const dietStore = useDietStore()

const showComponentAddWater = ref(false)
const dashData = reactive({
  consumed: 0,
  burned: 0,
  goal: 0,
  remaning: 0,
  daily: 0
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

let meals = dietStore.getMeals

onMounted(() => {
  fetchDiaryData()
})

const showAddWater = () => {
  showComponentAddWater.value = true
}

const addWater = (e) => {
  showComponentAddWater.value = false

  if (e) {
    dietStore.editDiary({
      consumed_water: (e + meals.item.quantity),
      remaning_daily_goal_kcal: (dashData.goal - dashData.consumed)
    })
      .then((data) => {
        dietStore.setConsumedWater(data.consumed_water)
      })
  }
}

const fetchDiaryData = async () => {
  await dietStore.fetchDiary()
  const data = dietStore.getDiary

  const { remaning_daily_goal_kcal, consumed_water, consumed_kcal,
    burned_kcal, consumed_carb, consumed_fat, consumed_protein } = data
  const { daily_goal_kcal, protein, carb, fat } = data.progress

  macros.protein.total = protein;
  macros.carb.total = carb;
  macros.fat.total = fat;

  dashData.goal = Math.round(daily_goal_kcal);
  dashData.consumed = consumed_kcal;
  dashData.burned = burned_kcal;
  dashData.remaning = remaning_daily_goal_kcal;


  macros.protein.now = consumed_protein;
  macros.carb.now = consumed_carb;
  macros.fat.now = consumed_fat;


  dietStore.setConsumedWater(consumed_water)

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

      <VBottomMenu class="footer" actualRoute="/diet" />


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
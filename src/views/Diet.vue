<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDietStore } from '../stores/diet.store'
import { useAppStore } from '../stores/app.store'
import VAccordionMeal from '../components/VAccordionMeal.vue'
import VDashboardDiet from '../components/VDashboardDiet.vue'
import VTitleDatePage from '../components/VTitleDatePage.vue'
import VBottomMenu from '../components/VBottomMenu.vue'
import VAddMeal from '../components/VAddMeal.vue'

const router = useRouter()
const dietStore = useDietStore()
const appStore = useAppStore()
const meals = ref([])

const water = {
  title: 'Agua',
  isWater: true,
  quantity: ref(0)
}

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

onMounted(() => {
  fetchDiaryData()

  if (!appStore.getCurrentQueryDate) {
    appStore.setCurrentDayToDateSearch()
    router.push({ name: 'Diet', params: { date: appStore.getCurrentQueryDate } })
  }
})


const showAddWater = () => {
  router.push('/water')
}

const fetchDiaryData = async () => {

  await dietStore.fetchDiary(appStore.getCurrentQueryDate)

  const data = dietStore.getDiary

  if (!data) {
    return
  }

  const {
    remaning_daily_goal_kcal,
    consumed_kcal,
    burned_kcal,
    consumed_carb,
    consumed_fat,
    consumed_protein
  } = data
  const { daily_goal_kcal, protein, carb, fat } = data.progress

  macros.protein.total = protein
  macros.carb.total = carb
  macros.fat.total = fat

  dashData.goal = Math.round(daily_goal_kcal)
  dashData.consumed = consumed_kcal
  dashData.burned = burned_kcal
  dashData.remaning = remaning_daily_goal_kcal

  macros.protein.now = consumed_protein
  macros.carb.now = consumed_carb
  macros.fat.now = consumed_fat

  data.water.forEach((element) => {
    water.quantity.value += element.consumed_water
  })

  data.meal.forEach((element) => {
    dashData.consumed += element.meal_consumed_kcal
    macros.protein.now += element.meal_consumed_protein
    macros.carb.now += element.meal_consumed_carb
    macros.fat.now += element.meal_consumed_fat
console.log(element)
    meals.value.push({
      ...element,
      items: element.meal_food,
      title: element.name,
      quantity: element.meal_consumed_kcal,
      id: element.id
    })
  })
}

const actionsTitlePage = [
  {
    btIcon: '',
    goTo: '/diet'
  },
  {
    btIcon: '',
    goTo: '/diet'
  }
]

const createEditMeal = (create = false, id) => {
  if (create) {
    router.push(`/meal`)
    return
  }
  return router.push(`/meal/edit/${id}`)
}

</script>

<template>
  <section class="diet">
    <header class="header">
      <VTitleDatePage :actions="actionsTitlePage" :isDateDiet="true" />
    </header>
    <main class="main" :class="{ 'open-show-meal': dietStore.getShowComponentMeal }">
      <VDashboardDiet :dashInfo="dashData" :macros="macros" />

      <div class="box-ingredients">
        <VAccordionMeal @showAddWater="() => showAddWater()" class="meal" :data="water" />
        <VAccordionMeal @showAddFood="(e) => createEditMeal(false, e)" @deleteMeal="(e) => deleteMeal(e)" class="meal"
          v-for="meal in meals" :data="meal" :key="meal.id" />
      </div>

      <VAddMeal class="box-add-meal" :data="{ meals: meals }" />
      <VBottomMenu class="footer" actualRoute="/diet" />
    </main>
  </section>
</template>

<style scoped>
.diet {
  background-color: var(--bg-color-dark);
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;

  .main {
    width: 100%;
    
    &.open-show-meal{
      overflow: hidden;
      height: 500px;
    }

    .footer {
      position: fixed;
      z-index: 3;
      width: 100%;
      bottom: 0;
    }

    .box-ingredients {
      margin: 30px 0 100px 0;

      .meal {
        padding: 5px 20px;
        margin: 0 0 10px 0;
      }
    }
  }
}
</style>

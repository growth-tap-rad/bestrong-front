<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useDietStore } from '../stores/diet.store';
import VAccordionMeal from '../components/VAccordionMeal.vue';
import VDashboardDiet from '../components/VDashboardDiet.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';
import VBottomMenu from '../components/VBottomMenu.vue'
import VAddMeal from '../components/VAddMeal.vue';
import VButtonBottomOptions from '../components/VButtonBottomOptions.vue';

const router = useRouter()
const dietStore = useDietStore()
const showComponentAddMeal = ref(false)
const ButtonBottomOptions = ref(false)
const meals = ref([])

const water = {
  title: "Agua",
  isWater: true,
  quantity: ref(0),
}
const Meal = reactive({
  showComponentAddMeal,
  meals
})
const dashData = reactive({
  consumed: 0,
  burned: 0,
  goal: 0,
  remaning: 0,
  daily: 0,
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
})
const showAddWater = () => {
  router.push('/water')
}
const showAddMeal = () => {
  hideButtonBottomOptions()
  showComponentAddMeal.value = true

}
const addMeal = (e) => {
  hideButtonBottomOptions()
  showComponentAddMeal.value = false

  //TODO VERIFICAR PORQUE DISSO
  if (e) {
    meals.value = []
    dietStore.createMeal(e)
      .then((data) => {
        data.meal.forEach(element => {
          meals.value.push({ title: element.name, quantity: element.meal_consumed_kcal })
        });
      })
  }
}
const showAddFood = (id) => {
  router.push(`/meal/edit/${id}`);
}
const editMeal = (id) => {
  
  router.push(`/meal/edit/${id}`);
}
const hideButtonBottomOptions = () => {
  ButtonBottomOptions.value = false
}
const showButtonBottomOptions = () => {
  ButtonBottomOptions.value = !ButtonBottomOptions.value
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

  data.water.forEach(element => {
    water.quantity.value += element.consumed_water
  });


  data.meal.forEach(element => {

     dashData.consumed += element.meal_consumed_kcal
    macros.protein.now += element.meal_consumed_protein;
    macros.carb.now += element.meal_consumed_carb;
    macros.fat.now += element.meal_consumed_fat; 

    meals.value.push({ ...element, items: element.meal_food, title: element.name, quantity: element.meal_consumed_kcal, id: element.id })
  });
  editDiary()
}
const editDiary = async () => {

  const Diary = {
    burned_kcal: dashData.burned,
    consumed_carb: macros.carb.now,
    consumed_fat: macros.fat.now,
    consumed_kcal: dashData.consumed,
    consumed_protein: macros.protein.now,
    consumed_water: water.quantity.value
  }
  dietStore.editDiary(Diary)
}
const actionsTitlePage = [
  {
    btIcon: "",
    goTo: ""
  },
  {
    btIcon: "",
    goTo: ""
  }
]


</script>

<template>
  <section class="diet">
    <header class="header">
      <VTitleDatePage :actions="actionsTitlePage" />
    </header>
    <main class="main">
      <VDashboardDiet :dashInfo="dashData" :macros="macros" />

      <div class="box-ingredients">
        <VAccordionMeal @showAddWater="() => showAddWater()" class="meal" :data="water" />
        <VAccordionMeal @showAddFood="(e) => showAddFood(e)" class="meal" v-for="meal in meals" :data="meal" />
      </div>

      <VAddMeal class="box-add-meal" :data="Meal" @selectedMeal="(e) => editMeal(e)"
        @showAddMeal="(e) => { addMeal(e) }" />

      <VButtonBottomOptions class="button-bottom-bptions" :show="ButtonBottomOptions"
        @hideButtonBottomOptions="() => showButtonBottomOptions()" @showAddMeal="() => showAddMeal()"
        @showAddWater="() => showAddWater()" />
      <VBottomMenu :show="ButtonBottomOptions" @showButtonBottomOptions="() => showButtonBottomOptions()" class="footer"
        actualRoute="/diet" />

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
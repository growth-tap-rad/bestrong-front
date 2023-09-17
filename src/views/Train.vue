<script setup>
import VAccordionMeal from '../components/VAccordionMeal.vue';
import VDashboardDiet from '../components/VDashboardDiet.vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';
import { onMounted } from 'vue'
import * as userService from '../service/user.service.js';
import Menunferior from '../components/MenuInferior.vue'
import { reactive, ref } from 'vue';
import VTrainList from '../components/VTrainList.vue';
import esteira from '@/assets/imgs/esteira.jpeg';


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

const train = ref(true);
const exercise = ref(false);


function toggleOption(option) {
  if (option === 'train') {
    train.value = !train.value;
    exercise.value = false;
  } else if (option === 'exercise') {
    exercise.value = !exercise.value;
    train.value = false;
  }

}


let atividades = [
  {
    title: 'CARDIO',
    minutes: 50,
    exercisesQty: 10,
    img: esteira,
    exercises: ["Biceps", "Peito"]
  },
  {
    title: 'CARDIO2',
    minutes: 50,
    exercisesQty: 10,
    img: "https://sciath.com.br/wp-content/uploads/2021/11/sedentarismo.jpg",
  },
]

</script>

<template>
  <section class="train">
    <header class="header">
      <VTitleDatePage title="Treino" :actions="false" />
    </header>
    <main class="main">
      <div class="box-img-overlay-train"></div>
      <section class="actions">
        <button class="button" @click="toggleOption('train')" :class="{ 'selected': train }">Treino</button>
        <button class="button" @click="toggleOption('exercise')" :class="{ 'selected': exercise }">Exercícios</button>
      </section>
      <section class="box-selections">
        <VTrainList v-if="train" v-for="atividade in atividades" class="selection" :data="atividade"
          :selected="atividade.selected" @update="(e) => selectActivityLevel(e)" />
      </section>
    </main>
  </section>
</template>

<style scoped>
.train {
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .main {
    width: 100%;
    height: 100%;
    position: relative;

    .box-img-overlay-train {
      position: absolute;
      height: 100%;
      width: 100%;
      background-image: url("../assets//imgs/treinando.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 8%;
    }

    .actions {
      display: flex;
      position: absolute;
      top: 0;
      width: 100%;

      .button {
        width: 100%;
        background-color: transparent;
        border: none;
        color: var(--bg-color-grey2);
        font-weight: bold;
        padding: 20px;
        font-size: 18px;

        &.selected {
          border-bottom: 1px solid var(--text-color-highlighted2);
          color: var(--text-color-highlighted2);
        }
      }
    }
  }

  .box-selections {
    margin-top: 100px;
    padding: 0 20px;

    .selection{
      margin: 20px auto;
    }
  }

}
</style>
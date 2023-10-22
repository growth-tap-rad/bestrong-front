<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VInput from '../components/VInput.vue';
import VtitlePage from '../components/VtitlePage.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import { useMealStore } from '../stores/meal.store'

const router = useRouter()
const route = useRoute()
const mealStore = useMealStore()
const meal = ref('')
const data = new Date()
const findMeal = ref({})
const mealMacros = ref({});

const calcMacros = () => {
  let kcal = 0;
  let protein = 0;
  let carb = 0;
  let fat = 0;

  meal.value?.meal_food.forEach(el => {
    protein += el.food?.protein * el.quantity;
    carb += el.food?.carb * el.quantity;
    fat += el.food?.fat * el.quantity;
    kcal += el.food?.energy * el.quantity;
  });

  mealMacros.value = {
    kcal: kcal.toFixed(1),
    protein: protein.toFixed(1),
    carb: carb.toFixed(1),
    fat: fat.toFixed(1)
  }
}
const back = () => {
  router.push('/diet')
}
const updateMeal = (e) => {
  meal.value = e
}

onMounted(async () => {

  data.value = new Date(meal.value.created_at)
  if (meal.value && meal.value.meal_food) {
    calcMacros();
  }

})

const addMeal = () => {
  if (meal.value) {
    mealStore.createMeal({
      name: meal.value,
      meal_consumed_kcal: mealMacros.value.kcal,
      meal_consumed_carb: mealMacros.value.carb,
      meal_consumed_fat: mealMacros.value.fat,
      meal_consumed_protein: mealMacros.value.protein,
    })
    router.push('/diet')
    return
  }
  alert("Adicione um nome para a refeição")
}

const addFood = async () => {
  if (meal.value) {
    const createdMeal = await mealStore.createMeal({
      name: meal.value,
    })
    
    router.push(`/meal/${createdMeal.id}/foods`);
    return
  }
  alert("Adicione um nome para a refeição")
}

</script>

<template>
  <div class="meal">
    <header class="header">
      <VButtonArrowLeft @click="back" />
      <VtitlePage class="title" title="Refeição" />
      <span class="spam">text</span>
    </header>
    <main class="main">
      <VInput :value="meal" @update="(e) => updateMeal(e)" class="input" />


      <section class="macrosValue">
        <div class="paragraphMacros">
          <span class="kcal value">0</span>
          <span class="text">Kcal</span>
        </div>
        <div class="paragraphMacros">
          <span class="value">0</span>
          <span class="text">Prot</span>
        </div>
        <div class="paragraphMacros">
          <span class="value">0</span>
          <span class="text">Carb</span>
        </div>
        <div class="paragraphMacros">
          <span class="value">0</span>
          <span class="text">Gord</span>
        </div>
        <div>
        </div>
      </section>

      <section class="time">
        <p>Horario</p>
        <p>{{ data.getHours() <= 9 ? "0" + data.getHours() : data.getHours() }} : {{ data.getMinutes() < 9 ? "0" +
          data.getMinutes() : data.getMinutes() }}</p>
      </section>

      <section class="mealsList">

        <section class="foodItems">
          <div v-for="food in meal.meal_food" class="foodItem">
            <span class="oveflow">{{ food.name }}</span>
            <div> <span>{{ food.quantity }}</span> <span>{{ transformUnity(food.unity) }}</span> </div>
          </div>
        </section>

      </section>
      <VButton @click="addFood" text="+ Adicionar Alimento" class="add-food" />
      <VButton @click="addMeal" text="Salvar Refeição" class="button" />
    </main>

  </div>
</template>


<style scoped>
p {
  color: white;
}

.meal {
  background-color: var(--bg-color-dark);
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .spam {
      color: transparent;
    }
  }

  .add-food {
    background-color: transparent;
    text-align: justify;
    padding: 30px 0 30px 10px;
  }


  .input {
    margin-bottom: 20px;
  }

  .title {
    text-align: center;
  }

  .macrosList {
    display: flex;
    color: var(--text-color-light);
    background-color: var(--bg-color-grey);
    justify-content: center;
    align-items: center;
    gap: 30px;

  }

  .macrosValue {
    display: flex;
    color: var(--text-color-light);
    background-color: var(--bg-color-dark3);
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 5px;
  }

  .paragraphValue {
    margin-top: 20px;
  }

  .paragraphMacros {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    padding: 10px 0;


    .value {
      font-weight: bold;
      font-size: 22px;
    }

    .text {
      color: var(--bg-color-grey2);
    }

    .kcal {
      color: var(--text-color-highlighted2);
    }
  }

  .time {
    display: flex;
    color: var(--text-color-light);
    justify-content: center;
    justify-content: space-between;
    /* gap: 1000px; */
    padding: 30px;
    margin-top: 30px;
  }
}
</style>
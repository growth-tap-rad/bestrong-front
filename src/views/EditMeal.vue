<script setup>
import { ref, onMounted } from 'vue';
import VButton from '../components/VButton.vue';
import VInput from '../components/VInput.vue';
import VtitlePage from '../components/VtitlePage.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import { useMealStore } from '../stores/meal.store'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const data = ref(new Date());
const mealStore = useMealStore()
const meal = ref({})
const mealMacros = ref({});

onMounted(async () => {
  if (route.params.id) {

    const foundMeal = await mealStore.findMeal(route.params.id)
    meal.value = foundMeal
    data.value = new Date(meal.value.created_at)
    calcMacros();
  }
})

const back = () => {
  router.push('/diet')
}

const updateMeal = (e) => {
  meal.value.name = e
}

const editMeal = () => {

  if (meal.value.name) {
  
    mealStore.editMeal({
      id: route.params.id,
      
      name: meal.value.name,
      meal_consumed_kcal: mealMacros.value.kcal,
      meal_consumed_carb: mealMacros.value.carb,
      meal_consumed_fat: mealMacros.value.fat,
      meal_consumed_protein: mealMacros.value.protein,


    })
      .then(() => {
        router.push('/diet')
        return
      })
  }



}

const addFood = () => {
  router.push(`/meal/${route.params.id}/foods`);
}

const transformUnity = (unity) => {
  if (unity == 'Unidade') {
    return 'U'
  } else if (unity == 'Unidade Pequena') {
    return 'u'
  }
  else if (unity == 'Mililitro') {
    return 'ml'
  }
  return 'g'
}

const calcQuantity = (quantity, unity) => {
  const qtd = parseInt(quantity) || 1;
  const unit = parseInt(unity) || 1;
  return parseInt(qtd * unit)
}

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


</script>

<template>
  <div class="meal">
    <header class="header">
      <VButtonArrowLeft @click="back" />
      <VtitlePage class="title" :title="'Refeição'" />
      <span class="spam">text</span>
    </header>
    <main class="main">
      <VInput :value="meal.name" @update="(e) => updateMeal(e)" class="input" />

      <section class="macrosValue">
        <div class="paragraphMacros">
          <span class="kcal value">{{ mealMacros.kcal }}</span>
          <span class="text">Kcal</span>
        </div>
        <div class="paragraphMacros">
          <span class="value">{{ mealMacros.protein }}</span>
          <span class="text">Prot</span>
        </div>
        <div class="paragraphMacros">
          <span class="value">{{ mealMacros.carb }}</span>
          <span class="text">Carb</span>
        </div>
        <div class="paragraphMacros">
          <span class="value">{{ mealMacros.fat }}</span>
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
            <div> <span>{{ calcQuantity(food.quantity, food.unity) }}</span> <span>{{ transformUnity(food.unity) }}</span>
            </div>
          </div>
        </section>

      </section>
      <VButton @click="addFood" text="+ Adicionar Alimento" class="add-food" />
      <VButton @click="editMeal" text="Salvar Refeição" class="button" />
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
    padding: 40px 0;
  }


  .input {
    margin-bottom: 20px;
  }

  .title {
    text-align: center;
  }


  .foodItems {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .foodItem {
      color: var(--text-color-light);
      background-color: var(--bg-color-dark3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      border-radius: 5px;
    }
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

  .oveflow {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
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
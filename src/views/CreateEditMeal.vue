<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMealStore } from '../stores/meal.store'
import { useFoodStore } from '../stores/food.store'
import { useAppStore } from '../stores/app.store'
import { useDietStore } from '../stores/diet.store'
import VButton from '../components/VButton.vue'
import VInput from '../components/VInput.vue'
import VtitlePage from '../components/VtitlePage.vue'
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue'


const router = useRouter()
const route = useRoute()

const dietStore = useDietStore()
const foodStore = useFoodStore()
const appStore = useAppStore()

const data = ref(new Date())
const mealStore = useMealStore()
const meal = ref({})
const mealMacros = ref({})

onMounted(() => {
  fetchMeal()
})
const fetchMeal = async () => {
  if (route.params.id) {
    const foundMeal = await mealStore.findMeal(route.params.id)
    meal.value = foundMeal
    data.value = new Date(meal.value.created_at)
    calcMacros()
  }
}

const showToast = (error) => {
  if (error) {
    console.error('Erro: ', error?.error || error)
  }

  appStore.setToast({
    show: true,
    message: error.message,
    description: chooseMessage(error)
  })
}

const chooseMessage = (error) => {
  switch (error?.error?.response?.status) {
    case 401:
      return 'Não autorizado';
    case 500:
      return 'Ops, Ocorreu um erro';
    default:
      return error.description || 'Falha de comunicação';
  }
}

const back = () => {
  router.push({ name: 'Diet', params: { date: appStore.getCurrentQueryDate } })
}

const updateMeal = (e) => {
  meal.value.name = e
}
const createMeal = async () => {
  const appStore = useAppStore()

  return await mealStore.createMeal({
    name: meal.value.name,
    meal_consumed_kcal: mealMacros.value.kcal,
    meal_consumed_carb: mealMacros.value.carb,
    meal_consumed_fat: mealMacros.value.fat,
    meal_consumed_protein: mealMacros.value.protein,
    date: appStore.getCurrentQueryDate,
  })
}

const addFood = async () => {
  if (!meal.value.name) {
    showToast({
      message: 'Alerta',
      description: 'Digite um nome para a refeição'
    })
    return
  }

  if (route.params.id) {
    goToFoods(route.params.id)
    return
  } else if (meal.value.id) {
    goToFoods(meal.value.id)
    return
  }
  const data = await createMeal()

  goToFoods(data.id)
}

const goToFoods = (id) => {
  router.push(`/meal/${id}/foods`)
}

const editMeal = async () => {
  if (!meal.value.name) {
    showToast({
      message: 'Alerta',
      description: 'Digite um nome para a refeição'
    })
  }
  if (route.params.id) {
    await mealStore
      .editMeal({
        id: route.params.id,

        name: meal.value.name,
        meal_consumed_kcal: mealMacros.value.kcal,
        meal_consumed_carb: mealMacros.value.carb,
        meal_consumed_fat: mealMacros.value.fat,
        meal_consumed_protein: mealMacros.value.protein
      })
    await router.push({ name: 'Diet', params: { date: appStore.getCurrentQueryDate } })
  } else {
    await createMeal()
    await router.push({ name: 'Diet', params: { date: appStore.getCurrentQueryDate } })
    closeMenusMeals()
  }

}

const closeMenusMeals = () => {
  dietStore.setShowComponentMeal(false)
  dietStore.setShowComponentMenuOptions(false)
}

const calcMacros = () => {
  let kcal = 0
  let protein = 0
  let carb = 0
  let fat = 0

  meal.value?.meal_food.forEach((el) => {
    protein += el.food?.protein * el.quantity
    carb += el.food?.carb * el.quantity
    fat += el.food?.fat * el.quantity
    kcal += el.food?.energy * el.quantity
  })

  mealMacros.value = {
    kcal: kcal.toFixed(1),
    protein: protein.toFixed(1),
    carb: carb.toFixed(1),
    fat: fat.toFixed(1)
  }
}

const getUnity = (unityText) => {
  return foodStore.transformUnity(unityText, true)
}

const calcQuantity = (qtd, amount, desc) => {
  return foodStore.transformQuantity(qtd, amount, desc)
}
const deleteMeal = async () => {
  const foodToDelete = meal.value.meal_food.map(async food => {
    return await foodStore.deleteMealFood(food.id)
  });
  await Promise.all(foodToDelete)

  mealStore.deleteMeal(route.params.id).then(() => {
    router.push({ name: 'Diet', params: { date: appStore.getCurrentQueryDate } })
  })
}
const deleteMealFood = (id) => {

  foodStore.deleteMealFood(id).then(() => {
    fetchMeal()
  })
}

const showFood = mealfood => {
  router.push(`/meal/${route.params.id}/food/${mealfood.food.id}/meal_food/${mealfood.id}`);
}
</script>

<template>
  <div class="meal">
    <header class="header">
      <VButtonArrowLeft @click="back" />
      <VtitlePage class="title" :title="'Refeição'" />
    </header>
    <main class="main">
      <VInput :value="meal.name" @update="(e) => updateMeal(e)" class="input" />

      <section class="macrosValue">
        <div class="paragraphMacros">
          <span class="kcal value">{{ mealMacros.kcal || '0.00' }}</span>
          <span class="text">Kcal</span>
        </div>
        <div class="paragraphMacros">
          <span class="value">{{ mealMacros.protein || '0.00' }}</span>
          <span class="text">Prot</span>
        </div>
        <div class="paragraphMacros">
          <span class="value">{{ mealMacros.carb || '0.00' }}</span>
          <span class="text">Carb</span>
        </div>
        <div class="paragraphMacros">
          <span class="value">{{ mealMacros.fat || '0.00' }}</span>
          <span class="text">Gord</span>
        </div>
        <div></div>
      </section>

      <section class="time">
        <p>Horario</p>
        <p>
          {{ data.getHours() <= 9 ? '0' + data.getHours() : data.getHours() }} : {{ data.getMinutes() < 9 ? '0' +
            data.getMinutes() : data.getMinutes() }} </p>
      </section>

      <section class="mealsList">
        <section class="foodItems">
          <div v-for="mealFood in meal.meal_food" :key="mealFood.id" class="foodItem">
            <span class="oveflow" @click="showFood(mealFood)">{{ mealFood.name }}</span>
            <div>
              <span>{{ calcQuantity(mealFood.quantity, mealFood.amount, mealFood.unity) }}</span>
              <span>{{ getUnity(mealFood.unity) }}</span>
            </div>
            <button class="delete" @click="deleteMealFood(mealFood.id)">
              <i class="bi bi-trash3 delete"></i>
            </button>
          </div>
        </section>
      </section>
      <VButton @click="addFood" text="+ Adicionar Alimento" class="add-food" />
      <VButton @click="editMeal" text="Salvar Refeição" class="button" />
      <VButton v-if="route.params.id" @click="deleteMeal" text=" Excluir refeição " class="delete-food" />
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

    .title {
      margin: 0 auto;
      padding-right: 40px;
    }

    .spam {
      color: transparent;
    }
  }

  .add-food {
    background-color: transparent;
    text-align: justify;
    padding: 40px 0;
  }

  .delete-food {
    background-color: transparent;
    text-align: center;
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

      .delete {
        border: none;
        color: var(--text-color-light);
        background: transparent;
        width: 30px;
        height: 30px;
        font-size: 20px;
      }
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

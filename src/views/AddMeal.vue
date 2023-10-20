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

const back = () => {
  router.push('/diet')
}
const updateMeal = (e) => {
  meal.value = e
}

onMounted(async () => {
  if (route.params.id) {

    findMeal.value = await mealStore.findMeal(route.params.id)
    meal.value = findMeal.value
    data.value = new Date(meal.value.created_at)
  }
})

const addMeal = () => {
  if (meal.value) {
    mealStore.createMeal(meal.value)
      .then((meal) => {
        router.push(`/meal/${meal.id}/foods`);
       

      })
    return
  }
  alert("Digite uma refeição")
  return
}

const addFood = () => {

  if (route.params.id) {
    router.push(`/meal/${route.params.id}/foods`);
  } else {
    alert("você deve criar uma refeição primeiro")
  }

}

</script>

<template>
  <div class="meal">
    <header class="header">
      <VButtonArrowLeft @click="back" />
      <VtitlePage class="title" title="Refeição" />
      <spam class="spam">text</spam>
    </header>
    <main class="main">
      <VInput :value="meal" @update="(e) => updateMeal(e)" class="input" />

      <section class="macrosValue">
        <p class="paragraphValue">0</p>
        <p class="paragraphValue">0</p>
        <p class="paragraphValue">0</p>
        <p class="paragraphValue">0</p>
      </section>

      <section class="macrosList">
        <p class="paragraphMacros">Kcal</p>
        <p class="paragraphMacros">Prot</p>
        <p class="paragraphMacros">Carb</p>
        <p class="paragraphMacros">Gord</p>
      </section>

      <section class="time">
        <p>Horario</p>
        <p>{{ data.getHours() > 10 ? data.getHours() : '0' + data.getHours() }} : {{data.getMinutes() > 10 ? data.getMinutes() : '0' + data.getMinutes() }}</p>
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
    background-color: var(--bg-color-grey);
    justify-content: center;
    align-items: center;
    gap: 55px;
  }

  .paragraphValue {
    margin-top: 20px;
  }

  .paragraphMacros {
    /* text-align: center; */

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
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

const mealStore = useMealStore()
const meal = ref('')
const findMeal = ref({})

onMounted(async () => {
  if (route.params.id) {

    findMeal.value = await mealStore.findMeal(route.params.id)
    meal.value = findMeal.value

  }
})

const back = () => {
  router.back()
}
const updateMeal = (e) => {
  meal.value = e
}
const editMeal = () => {
  if (meal.value) {
    mealStore.editMeal({
      name: meal.value,
      id: route.params.id
    })
      .then(() => {
        router.push('/diet')
        return
      })
  }
  else {
    alert('aqui vai apagar')
    return
  }


}
const addFood = () => {
  router.push(`/meal/${route.params.id}/foods`);
}
const data = new Date()


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

</script>

<template>
  <div class="meal">
    <header class="header">
      <VButtonArrowLeft @click="back" />
      <VtitlePage class="title" :title="'Refeição'" />
      <spam class="spam">text</spam>
    </header>
    <main class="main">
      <VInput :value="meal.name" @update="(e) => updateMeal(e)" class="input" />

      <section class="macrosValue">
        <p class="paragraphValue">0</p>
        <p class="paragraphValue">0</p>
        <p class="paragraphValue">0</p>
        <p class="paragraphValue">0</p>
        <!-- //FAZER ISSO DINAMICO REFLETIDO COM BASE NOS 'foodItem' abaixo -->
      </section>

      <section class="macrosList">
        <p class="paragraphMacros">Kcal</p>
        <p class="paragraphMacros">Prot</p>
        <p class="paragraphMacros">Carb</p>
        <p class="paragraphMacros">Gord</p>
        <!-- //FAZER ISSO DINAMICO REFLETIDO COM BASE NOS 'foodItem' abaixo -->
      </section>

      <section class="time">
        <p>Horario</p>
        <p>{{ data.getHours() }} : {{ data.getMinutes() }}</p>
      </section>

      <section class="mealsList">

        <section class="foodItems">
          <div v-for="food in meal.meal_food" class="foodItem">
            <span class="oveflow">{{ food.name }}</span>
            <div> <span>{{ food.quantity }}</span> <span>{{ transformUnity(food.unity) }}</span> </div>
          </div>
        </section>

      </section>
      <VButton @click="addFood" text="+ Alimento" class="add-food" />
      <VButton @click="editMeal" text="Adicionar Refeição" class="button" />
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
    background-color: var(--bg-color-dark3);
    justify-content: center;
    align-items: center;
    gap: 30px;
    border-radius: 5px;
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
    gap: 55px;
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
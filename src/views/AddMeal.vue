<script setup>
import { ref } from 'vue';
import VButton from '../components/VButton.vue';
import VInput from '../components/VInput.vue';
import VtitlePage from '../components/VtitlePage.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import { useMealStore } from '../stores/meal.store'
import { useRouter } from 'vue-router';

const router = useRouter()
const mealStore = useMealStore()
const meal = ref('')
const updateMeal = (e) => {
  meal.value = e
}
const addMeal = () => {
  mealStore.createMeal(meal.value)
    .then(() => {
      router.push('/diet')
    })
}

</script>

<template>
  <div class="meal">
    <header class="header">
      <VButtonArrowLeft />
      <VtitlePage class="title" :title="'Refeição'" />
      <spam class="spam">text</spam>
    </header>
    <main>
      <VInput @update="(e) => updateMeal(e)" class="input" />

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
        <p>8:00</p>
      </section>

      <section class="mealsList">
        <P class="meal-value">Pão</P>
        <p class="meal-value">50g</p>
      </section>

      <VButton @click="addMeal" :text="`+ Adicionar Alimento`" class="button" />
    </main>

  </div>
</template>


<style scoped>
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

  .mealsList {
    background-color: var(--bg-color-grey);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    width: 100%;
    height: 60px;
    color: var(--text-color-light);
    border-radius: 8px;
    margin: auto;
    margin-bottom: 20px;

    .meal-value {
      margin: 0;
    }


  }
}
</style>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useExerciseStore } from '../stores/exercise.store'
import VButton from '../components/VButton.vue';
import { useRoute, useRouter } from 'vue-router';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';

const route = useRoute()
const router = useRouter()
const exerciseStore = useExerciseStore()
let exercises = ref([])
let notFoundFoods = ref(false);

onMounted(async () => {
  await exerciseStore.fetchExercises()
  exercises.value = exerciseStore.getExercises
})

const back = () => {
  router.push(`/meal/edit/${route.params.id}`)
}




const inputSearchFood = reactive({
  placeholder: 'Busque por um alimento...',
  type: 'text',
  value: '',
})


const debounce = (func, delay) => {
  let timerDebounce;

  return (...args) => {
    if (timerDebounce) {
      clearTimeout(timerDebounce);
    }
    timerDebounce = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

}


const addExerciseToTrain = (item) => {
     router.push(`/train/${route.params.id}/exercise/${item.id}`); 
}



</script>
<template>
  <div class="main">
    <nav class="nav">
      <VButtonArrowLeft class="arrow-left" @click="back()" />
      <span class="title">Exercicíos</span>
      <span></span>
    </nav>
    <section class="search-input-box">
    </section>
    <section class="list-foods">
      <VButton class="food" v-for="item in exercises" :text="item.name" @click="addExerciseToTrain(item)" />
    </section>
    <section class="not-found-foods" v-if="notFoundFoods">
      <span>Nenhum Resultado para esta pesquisa, tente buscar por outro alimento...</span>
    </section>
    <VButton class="more-food" @click="getFoods()" text="+ Alimentos" :disabled="notFoundFoods" />
  </div>
</template>
<style scoped>
.main {
  color: white;
  background-color: var(--bg-color-dark);

  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;

  .search-input-box {
    margin: 0 20px;
  }

  .not-found-foods {
    text-align: center;
    padding: 50px 0;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: bold;
    }

  }

  .list-foods {
    padding: 10px 15px;
    height: 100%;
  }

  .arrow-left {
    display: flex;
  }

  .food {
    background-color: var(--bg-color-dark);
    margin: 20px 0;
    padding: 20px;
    border-left: 2px solid var(--button-color-light);
    border-radius: 0;
  }

  .more-food {
    background-color: var(--bg-color-dark);
    margin-top: 20px;
    border-left: 3px solid var(--button-color-light);
    border-radius: 0;
    color: var(--button-color-light);

    &:disabled {
      opacity: 0.2;
    }
  }
}
</style>

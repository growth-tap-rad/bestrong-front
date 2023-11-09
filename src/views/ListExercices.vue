<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useExerciseStore } from '../stores/exercise.store'
import VButton from '../components/VButton.vue';
import { useRoute, useRouter } from 'vue-router';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VInputIcon from '../components/VInputIcon.vue';

const route = useRoute()
const router = useRouter()
const exerciseStore = useExerciseStore()
let exercises = ref([])
let page = 0;
let notFoundExercises = ref(false);

onMounted(async () => {
  getExercises()

})
const back = () => {
  router.push(`/train/edit/${route.params.id}`)
}
const setnotFoundExercises = () => {
  if (!exercises.value.length) {
    notFoundExercises.value = true
  } else {
    notFoundExercises.value = false
  }
}
const getExercises = async () => {
  const query = {
    page: page,
    search: inputSearchExercise.value || ''
  }
  await exerciseStore.fetchExercises(query)

  const storeExercise = exerciseStore.getExercises
  exercises.value = storeExercise ? [...exercises.value, ...storeExercise] : []
  page += 20;
  setnotFoundExercises()
}
const inputSearchExercise = reactive({
  placeholder: 'Busque por um exercicio...',
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
const addExerciseToTrain = (id) => {
  router.push(`/train/${route.params.id}/exercise/${id}`);
}
const findExercise = async () => {

  if (!inputSearchExercise.value) {
    page = 0;
    exercises.value = []
    getExercises()
    return
  }

  const query = {
    page: page,
    search: inputSearchExercise.value || ''
  }
  await exerciseStore.fetchExercises(query)
  const storeExercise = exerciseStore.getExercises
  exercises.value = storeExercise ? [...storeExercise] : []

  setnotFoundExercises()
}
const debounceFindExercise = debounce(findExercise, 600)


</script>
<template>
  <div class="main">
    <nav class="nav">
      <VButtonArrowLeft class="arrow-left" @click="back()" />
      <span class="title">Exercicíos</span>
      <span></span>
    </nav>

    <section class="search-input-box">
      <VInputIcon :data="inputSearchExercise" :hasIcon="true" iconName="bi bi-search" v-model="inputSearchExercise.value"
        @input="debounceFindExercise()" />
    </section>
    <section class="list-exercises" v-if="!notFoundExercises">
      <VButton class="exercise" v-for="item in exercises" :text="item.name" @click="addExerciseToTrain(item.id)" />
    </section>
    <section class="not-found-exercises" v-if="notFoundExercises">
      <span>Nenhum Resultado para esta pesquisa, tente buscar por outro exercicio...</span>
    </section>
    <VButton class="more-exercise" @click="getExercises()" text="+ exercicio" :disabled="notFoundExercises" />
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

  .not-found-exercises {
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

  .list-exercises {
    padding: 10px 15px;
    height: 100%;
  }

  .arrow-left {
    display: flex;
  }

  .exercise {
    background-color: var(--bg-color-dark);
    margin: 20px 0;
    padding: 20px;
    border-left: 2px solid var(--button-color-light);
    border-radius: 0;
  }

  .more-exercise {
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

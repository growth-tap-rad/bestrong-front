<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useTrainStore } from '../stores/train.store'
import { useExerciseStore } from '../stores/exercise.store'
import VTitleDatePage from '../components/VTitleDatePage.vue'
import VBottomMenu from '../components/VBottomMenu.vue'
import VTrainList from '../components/VTrainList.vue'
import esteira from '@/assets/imgs/esteira.jpeg'
import router from '../router'
import VButton from '../components/VButton.vue';
import VInputIcon from '../components/VInputIcon.vue'

const exerciseStore = useExerciseStore()
let exercises = ref([])
const trainStore = useTrainStore()
const train = ref(true)
const exercise = ref(false)
let page = 0;
let activitys = ref({})

const toggleOption = (option) => {
  if (option === 'train') {
    train.value = true
    exercise.value = false
  } else if (option === 'exercise') {
    train.value = false
    exercise.value = true

  }
}
onMounted(async () => {
  await trainStore.fetchActivitys()
  activitys.value = trainStore.getActivitys
  const query = {
    page: page,
    search: inputSearchExercise.value || ''
  }
  await exerciseStore.fetchExercises(query)
  exercises.value = exerciseStore.getExercises
})
const infoExercice = (id) => {
  router.push(`/train/${id}/exercises`)
}
const addExerciseToTrain = (item) => {
  alert(item.id)
  router.push(`/train/${route.params.id}/exercise/${item.id}`);
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
  <section class="train">
    <header class="header">
      <VTitleDatePage title="Treino" :actions="false" />
    </header>
    <main class="main">


      <div class="box-img-overlay-train" :class="{ 'list-exercise': exercise }"></div>
      <section class="actions">
        <button class="button" @click="toggleOption('train')" :class="{ selected: train }">
          Treino
        </button>
        <button class="button" @click="toggleOption('exercise')" :class="{ selected: exercise }">
          Exercícios
        </button>
      </section>
      <section class="box-selections">
        <VTrainList @click="infoExercice(activity.id)" v-show="train" v-for="activity in activitys" :key="activity.id"
          class="selection" :data="{ title: activity.name, exercises: activity.exercises, img: esteira }"
          :selected="activity.selected" @update="(e) => selectActivityLevel(e)" />
        <VInputIcon v-show="exercise" :data="inputSearchExercise" :hasIcon="true" iconName="bi bi-search"
          v-model="inputSearchExercise.value" @input="debounceFindExercise()" />

        <VButton v-show="exercise" @click="addExerciseToTrain(item)" class="exercise" v-for="item in exercises"
          :text="item.name" />
      </section>
      <VButton v-show="exercise && !inputSearchExercise.value" class="more-exercise" @click="getExercises()"
        text="+ exercicio" :disabled="notFoundExercses" />
    </main>
    <VBottomMenu class="footer" actualRoute="/trains" />
  </section>
</template>

<style scoped>
.more-exercise {
  background-color: var(--bg-color-dark);
  margin: 20px 0 100px 0;
  border-left: 3px solid var(--button-color-light);
  border-radius: 0;
  color: var(--button-color-light);

  &:disabled {
    opacity: 0.2;
  }
}

.train {
  background-color: var(--bg-color-dark);
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;

  .footer {
    position: fixed;
    z-index: 10;
    width: 100%;
    bottom: 0;
  }

  .main {
    width: 100%;
    height: 100%;
    position: relative;

    .box-img-overlay-train {
      position: absolute;
      height: 100%;
      width: 100%;
      background-image: url('../assets//imgs/treinando.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 8%;
    }

    .list-exercise {
      position: relative;

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

    .selection {
      margin: 20px auto;
    }

    .exercise {
      background-color: var(--bg-color-dark);
      margin: 20px 0;
      padding: 20px;
      border-left: 2px solid var(--button-color-light);
      border-radius: 0;
      z-index: 10;

    }
  }
}
</style>

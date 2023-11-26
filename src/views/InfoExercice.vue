<script setup>
import { onMounted, ref } from 'vue'
import VButton from '../components/VButton.vue';
import { useRoute, useRouter } from 'vue-router';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VtitlePage from '../components/VtitlePage.vue';
import { useAppStore } from '../stores/app.store'
import { useExerciseStore } from '../stores/exercise.store';
import VInput from '../components/VInput.vue';


const exerciseStore = useExerciseStore()

const router = useRouter()
const route = useRoute()
const exercise = ref({})
const isEditing = ref(false)

const back = () => {
  router.back()
}
const showToast = (error) => {
  if (error) {
    console.error('Erro: ', error?.error || error)
  }
  const appStore = useAppStore()
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

const addExerciceToTrain = () => {
  if (!exercise.value.name ||
    !exercise.value.series ||
    !exercise.value.wheight ||
    !exercise.value.reps ||
    !exercise.value.rest_duration
  ) {
    showToast({
      message: 'Alerta',
      description: 'Preencha todas as informações'
    })
    return
  }
  if (isEditing.value) {
    exerciseStore.editExerciceToTrain({
      id: route.params.idexercise,
      series: parseInt(exercise.value.series),
      wheight: parseInt(exercise.value.wheight),
      reps: parseInt(exercise.value.reps),
      rest_duration: parseInt(exercise.value.rest_duration),

    }).then((data) => {
      router.back()
      return
    }).catch((err) => {
      showToast({
        error: err,
        message: 'Alerta',
        description: 'Preencha todas as informações'
      })

    })
  } else {
    exerciseStore.createExerciceToTrain({
      name: exercise.value.name,
      train_id: parseInt(route.params.id),
      exercise_id: parseInt(route.params.idexercise),
      series: parseInt(exercise.value.series),
      wheight: parseInt(exercise.value.wheight),
      reps: parseInt(exercise.value.reps),
      rest_duration: parseInt(exercise.value.rest_duration),

    }).then((data) => {
      router.back()
      return
    }).catch((err) => {
      showToast({
        error: err,
        message: 'Alerta',
        description: 'Preencha todas as informações'
      })
    })
  }
}
onMounted(async () => {
  exercise.value = await exerciseStore.getTrainExercise(route.params.idexercise)
  if (exercise.value) {
    isEditing.value = true
  }
  else {
    exercise.value = await exerciseStore.getExercise(route.params.idexercise)
  }
})
const updateExerciseSeries = (e) => {
  if (e < 1) {
    exercise.value.series = 1
    return
  }
  exercise.value.series = e
}
const updateExerciseWheight = (e) => {
  if (e < 1) {
    exercise.value.wheight = 1
    return
  }
  exercise.value.wheight = e
}
const updateExerciseReps = (e) => {
  if (e < 1) {
    exercise.value.reps = 1
    return
  }
  exercise.value.reps = e
}
const updateExerciseRestDuration = (e) => {
  if (e < 1) {
    exercise.value.rest_duration = 1
    return
  }
  exercise.value.rest_duration = e
}




</script>


<template>
  <div class="main">
    <header class="header">
      <VButtonArrowLeft @click="back()" />
      <VtitlePage class="title" title="Exercício" />
      <span class="spam"></span>
    </header>
    <main class="exercise">
      <section>
        <div class="header-exercise">
          <h2>{{ exercise.name }}</h2>

        </div>
        <h2 class="header-exercise-level"> Nível: {{ exercise.level }}</h2>

      </section>
      <section class="inputs">
        <VInput v-if="route.params.id" :value="exercise.series"
          :data="{ placeholder: 'Quantidade de series', type: 'number' }" @update="(e) => updateExerciseSeries(e)"
          class="input" />
        <div class=" wgt-and-reps">
          <VInput v-if="route.params.id" :value="exercise.wheight" :data="{ placeholder: 'Peso', type: 'number' }"
            @update="(e) => updateExerciseWheight(e)" class="input wgt" />
          <VInput v-if="route.params.id" :value="exercise.reps" :data="{ placeholder: 'Repetições', type: 'number' }"
            @update="(e) => updateExerciseReps(e)" class="input reps" />
        </div>

        <VInput v-if="route.params.id" :value="exercise.rest_duration"
          :data="{ placeholder: 'Tempo de descanso', type: 'number' }" @update="(e) => updateExerciseRestDuration(e)"
          class="input" />


      </section>


      <VButton v-if="route.params.id" @click="addExerciceToTrain()" :text="isEditing ? 'Editar' : 'Adicionar'"
        class="button" />
    </main>

  </div>
</template>

<style scoped>
.inputs {
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
  background-color: var(--bg-color-dark2);
  border-radius: 0 0 10px 10px;
  margin-bottom: 50px;

}

.wgt-and-reps {
  display: flex;
}

.wgt,
.reps {
  width: 50%;
}

.main {
  background-color: var(--bg-color-dark);
  color: var(--text-color-light);
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .input {
    margin: 10px 0;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .spam {
      color: transparent;
    }
  }

  .header-exercise {
    background-color: var(--bg-color-dark5);
    text-align: center;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .header-exercise-level {
    background-color: var(--bg-color-dark5);
    text-align: center;
    padding: 10px;
    border-radius: 0 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .quantity {
    font-size: 1.7em;
    font-weight: bold;
  }

  .body-exercise {
    .number-macros {
      color: var(--button-color-light);
    }


  }

  .macros {

    display: flex;

    justify-content: space-between;
    gap: 100px;
    margin: 20px;

    .top,
    .bottom {
      font-size: large;
      width: 100%;
      display: flex;
    }
  }

  .macros * {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 25px;
  }

  .title {
    text-align: center;
  }
}
</style>
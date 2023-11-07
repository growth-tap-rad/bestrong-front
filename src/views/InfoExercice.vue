<script setup>
import { onMounted, ref } from 'vue'

import VButton from '../components/VButton.vue';
import { useRoute, useRouter } from 'vue-router';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VtitlePage from '../components/VtitlePage.vue';
import { useAppStore } from '../stores/app.store'
import { useExerciseStore } from '../stores/exercise.store';


const exerciseStore = useExerciseStore()

const router = useRouter()
const route = useRoute()
const exercise = ref('')

const back = () => {
  router.back()
}
const showToast = (error) => {
  console.error('Erro: ', error.error)
  const appStore = useAppStore()
  appStore.setToast({
    show: true,
    message: error.message,
    description: error?.error?.response?.status
      ? 'Não autorizado'
      : error.description || 'Falha de comunicação'
  })
}
const addExerciceToTrain = () => {


  exerciseStore.createExerciceToTrain({
    name: exercise.value.name,
    train_id: route.params.id,
    exercise_id: route.params.idexercise,

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
onMounted(async () => {
  exercise.value = await exerciseStore.getExercise(route.params.idexercise)
  console.log(exercise.value)
})


const getUnity = (unityText) => {
  return foodStore.transformUnity(unityText);
}

const calcQuantity = (qtd, amount, desc) => {
  return foodStore.transformQuantity(qtd, amount, desc);
}

</script>


<template>
  <div class="main">
    <header class="header">
      <VButtonArrowLeft @click="back()" />
      <VtitlePage class="title" title="Alimento" />
      <span class="spam"></span>
    </header>
    <main class="exercise">
      <section>
        <div class="header-exercise">
          <h2>{{ exercise.name }}</h2>

        </div>
        <h2 class="header-exercise"> Nível: {{ exercise.level }}</h2>

      </section>
      <VButton @click="addExerciceToTrain()" text="Adicionar" class="button" />
    </main>

  </div>
</template>

<style scoped>
.main {
  background-color: var(--bg-color-dark);
  color: var(--text-color-light);
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

  .header-exercise {
    background-color: var(--bg-color-dark5);
    text-align: center;
    padding: 10px;
    border-radius: 10px 10px 0 0;
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

    .inputs {
      display: flex;
      padding: 15px;
      gap: 10px;
      background-color: var(--bg-color-dark2);
      border-radius: 0 0 10px 10px;

      .input-number {
        width: 4em;
        padding: 10px;
        border-radius: 8px;
        background-color: var(--bg-color-grey);
        color: var(--text-color-light2);
        border: none;
      }

      .input-measure {
        padding: 10px;
        border-radius: 8px;
        background-color: var(--bg-color-grey);
        color: var(--text-color-light2);
        border: none;
        width: 100%;
        padding: 10px;

      }

      .quantity-information {
        display: flex;
        flex-direction: column;
        text-align: center;


      }
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
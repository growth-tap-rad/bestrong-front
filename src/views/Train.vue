<script setup>
import { ref } from 'vue';
import VTitleDatePage from '../components/VTitleDatePage.vue';
import VBottomMenu from '../components/VBottomMenu.vue'
import VTrainList from '../components/VTrainList.vue';
import esteira from '@/assets/imgs/esteira.jpeg';
import sedentarismo  from '@assets/imgs/sedentarismo.jpg'
const train = ref(true);
const exercise = ref(false);

let atividades = [
  {
    title: 'CARDIO',
    minutes: 50,
    exercisesQty: 10,
    img: esteira,
    exercises: ["Biceps", "Peito"]
  },
  {
    title: 'CARDIO2',
    minutes: 50,
    exercisesQty: 10,
    img: sedentarismo,
  },
]

const toggleOption = (option) => {
  if (option === 'train') {
    train.value = !train.value;
    exercise.value = false;
  } else if (option === 'exercise') {
    exercise.value = !exercise.value;
    train.value = false;
  }

}



</script>

<template>
  <section class="train">
    <header class="header">
      <VTitleDatePage title="Treino" :actions="false" />
    </header>
    <main class="main">
      <div class="box-img-overlay-train"></div>
      <section class="actions">
        <button class="button" @click="toggleOption('train')" :class="{ 'selected': train }">Treino</button>
        <button class="button" @click="toggleOption('exercise')" :class="{ 'selected': exercise }">Exercícios</button>
      </section>
      <section class="box-selections">
        <VTrainList v-if="train" v-for="atividade in atividades" class="selection" :data="atividade"
          :selected="atividade.selected" @update="(e) => selectActivityLevel(e)" />
      </section>
    </main>
    <VBottomMenu class="footer" actualRoute="/train" />
  </section>
</template>

<style scoped>
.train {
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;


  .footer {
    position: fixed;
    z-index: 3;
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
      background-image: url("../assets//imgs/treinando.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 8%;
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
  }

}
</style>
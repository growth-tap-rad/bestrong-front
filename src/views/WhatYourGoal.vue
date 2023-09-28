<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.store';
import VButton from '../components/VButton.vue';
import VTitlePage from '../components/VtitlePage.vue';
import VBoxImgInfo from '../components/VBoxImgInfo.vue';
import deaflift from '@/assets/imgs/deadlift.jpeg';
import crossfit from '@/assets/imgs/crossfit.jpg';
import gym from '@/assets/imgs/gym.jpeg';

const userStore = useUserStore()
const router = useRouter()

let GOALS = reactive([
  {
    title: "Manter peso",
    text: "Vamos te ajudar a equilibrar a alimentação com exercícios para manter.",
    bg: deaflift,
    value: 'maintain',
    selected: false
  },
  {
    title: "Perder peso",
    text: "Ajudaremos com as informações do que precisa comer para organizar sua dieta.",
    bg: crossfit,
    value: 'lose',
    selected: false
  },

  {
    title: "Ganhar peso",
    text: "Vamos te ajudar a organizar o que você precisa comer para ganhar massa.",
    bg: gym,
    value: 'gain',
    selected: false
  },
])

const goToHeightWeight = () => {
  if (userStore.getGoal) {
    router.push('/height-weight')
    return
  }
  alert('Selecione o seu Objetivo')

}

const selectGoal = (e) => {

  GOALS = GOALS.map(goal => {
    if (goal.value == e) {
      goal.selected = !goal.selected


      if (goal.selected) {
        userStore.setGoal(goal.value)
      } else {
        userStore.setGoal('')
      }
    } else {
      goal.selected = false
    }
    return goal
  })
}

onMounted(() => {

  const selectedInStore = userStore.getGoal

  GOALS = GOALS.map(goal => {
    if (goal.value == selectedInStore) {
      goal.selected = !goal.selected
    }
    return goal
  })
})

</script>

<template>
  <section class="bg-goal">
    <VTitlePage title="Qual o seu objetivo?" />
    <VBoxImgInfo v-for="goal in GOALS" :data="goal" class="margin-y" :selected="goal.selected"
      @update="(e) => selectGoal(e)" />
    <VButton @click="goToHeightWeight" text="CONFIRMAR OBJETIVO" class="button" />
  </section>
</template>

<style scoped>
.bg-goal {
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .margin-y {
    margin: 10px 0;
  }

  .button {
    margin: 30px 0;
    background-color: var(--button-color-light);
    max-width: 500px;
  }

  padding-bottom: 50px;
}

@media (max-width: 768px) {
  .bg-goal {
    padding: 1rem;
  }
}
</style>
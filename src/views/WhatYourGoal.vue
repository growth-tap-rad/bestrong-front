<script setup>
import { ref } from 'vue'
import VButton from '../components/VButton.vue';
import VTitlePage from '../components/VtitlePage.vue';
import VBoxImgInfo from '../components/VBoxImgInfo.vue';
import { useUserStore } from '../stores/user.store';
import deaflift from '@/assets/imgs/deadlift.jpeg';
import crossfit from '@/assets/imgs/crossfit.jpg';
import gym from '@/assets/imgs/gym.jpeg';
import { useRouter } from 'vue-router';

const userStore = useUserStore()

const router = useRouter()
const GOALS = [
  {
    title: "Ganhar peso",
    text: "Vamos te ajudar a organizar o que você precisa comer para ganhar massa.",
    bg: deaflift,
    value: 'gain'
  },
  {
    title: "Perder peso",
    text: "Ajudaremos com as informações do que precisa comer para organizar sua dieta.",
    bg: crossfit,
    value: 'lose'
  },
  {
    title: "Manter peso",
    text: "Vamos te ajudar a equilibrar a alimentação com exercícios para manter.",
    bg: gym,
    value: 'maintain'
  }
]
const selectedGoal = ref("")


function goToHeightWeight() {
  userStore.setGoal(selectedGoal.value)
  router.push('/height-weight')
}
</script>

<template>
  <section class="bg-goal">
    <VTitlePage title="Qual o seu objetivo?" />
    <VBoxImgInfo v-for="goal in GOALS" :data="goal" class="margin-y" v-model="selectedGoal" @clicked="run" />
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
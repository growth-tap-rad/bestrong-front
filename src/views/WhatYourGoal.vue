<script setup>
import VButton from '../components/VButton.vue';
import VTitlePage from '../components/VtitlePage.vue';
import VBoxImgInfo from '../components/VBoxImgInfo.vue';

import deaflift from '@/assets/imgs/deadlift.jpeg';
import crossfit from '@/assets/imgs/crossfit.jpg';
import gym from '@/assets/imgs/gym.jpeg';

const GOALS = [
  {
    title: "Ganhar peso",
    text: "Vamos te ajudar a organizar o que você precisa comer para ganhar massa.",
    bg: deaflift
  },
  {
    title: "Perder peso",
    text: "Ajudaremos com as informações do que precisa comer para organizar sua dieta.",
    bg: crossfit
  },
  {
    title: "Manter peso",
    text: "Vamos te ajudar a equilibrar a alimentação com exercícios para manter.",
    bg: gym
  }
]

</script>

<template>
  <div class="bg-goal">
    <VTitlePage title="Qual o seu objetivo?" />
    <VBoxImgInfo v-for="goal in GOALS" :data="goal" class="margin-y" />
    <VButton text="CONFIRMAR OBJETIVO" class="button" />
  </div>
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
<script setup>
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';

const router = useRouter();

const goToWhatYourGoal = () => {
  router.push('/diet');
};
</script>

<template>
  <section class="bg-entry">
    <img src="../assets/imgs/growth-supplements.png" alt="growtrh logo" class="logo">
    <div class="actions">
      <VButton text="Entrar com Facebook" class="button1" @click="goToWhatYourGoal" />
      <VButton text="E-MAIL" class="button2" @click="goToWhatYourGoal"/>
    </div>
  </section>
</template>

<style scoped>
.bg-entry {
  background-color: var(--bg-color-light);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  /* min-height: 1024px; */
  .actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
    padding-bottom: 30px;
    margin: 0 15px;

    .button1 {
      background-color: var(--button-color-facebook);
    }

    .button2 {
      background-color: var(--button-color-light);
    }
  }

  .logo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

}

@media (max-width: 768px) {}
</style>
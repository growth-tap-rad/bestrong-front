<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.store';
import { useGoalStore } from '../stores/goal.store';
import VButton from '../components/VButton.vue';
import VTitlePage from '../components/VtitlePage.vue';
import VBoxImgInfo from '../components/VBoxImgInfo.vue';

const goals = useGoalStore()
const userStore = useUserStore()
const router = useRouter()

let GOALS = goals.getGoals
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
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.store'
import { useGoalStore } from '../stores/goal.store'
import VButton from '../components/VButton.vue'
import VTitlePage from '../components/VtitlePage.vue'
import VBoxImgInfo from '../components/VBoxImgInfo.vue'
import { useAppStore } from '../stores/app.store'

const goals = useGoalStore()
const userStore = useUserStore()
const router = useRouter()

let GOALS = goals.getGoals
const goToHeightWeight = () => {
  if (userStore.getGoal) {
    router.push('/height-weight')
    return
  }

  showToast({
    message: 'Alerta',
    description: 'Selecione o seu Objetivo'
  })
}
const showToast = (error) => {
  if (error) {
    console.error('Erro: ', error.error)
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

const selectGoal = (e) => {
  GOALS = GOALS.map((goal) => {
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

  GOALS = GOALS.map((goal) => {
    if (goal.value == selectedInStore) {
      goal.selected = !goal.selected
    }
    return goal
  })
})

const actionsTitlePage = [
  {
    btIcon: '',
    goTo: 'back'
  }
]
</script>

<template>
  <form class="bg-goal" @submit.prevent="goToHeightWeight">
    <VTitlePage title="Seu objetivo?" class="title-nav" :actions="actionsTitlePage" />
    <VBoxImgInfo v-for="goal in GOALS" :data="goal" class="margin-y" :selected="goal.selected"
      @update="(e) => selectGoal(e)" />
    <VButton text="Continuar" class="button" />
  </form>
</template>

<style scoped>
.bg-goal {
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title-nav {
    padding: 1em;
  }

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

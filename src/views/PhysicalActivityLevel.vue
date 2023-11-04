<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.store'
import { useActivityStore } from '../stores/activity.level.store'
import VBoxImgInfo from '../components/VBoxImgInfo.vue'
import VButton from '../components/VButton.vue'
import VtitlePage from '../components/VtitlePage.vue'
import { useAppStore } from '../stores/app.store'

const ActivityStore = useActivityStore()
const userStore = useUserStore()
const router = useRouter()
let activitys = ActivityStore.getActivitys

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
const goToYourGoal = () => {
  if (userStore.getActivityLevel) {
    router.push('/your-goal')
    return
  }

  showToast({
    message: 'Alerta',
    description: 'Selecione um nivel de atividade'
  })
}

const selectActivityLevel = (e) => {
  activitys = activitys.map((activity) => {
    if (activity.value == e) {
      activity.selected = !activity.selected

      if (activity.selected) {
        userStore.setActivity_level(activity.value)
      } else {
        userStore.setActivity_level('')
      }
    } else {
      activity.selected = false
    }
    return activity
  })
}
onMounted(() => {
  const selectedInStore = userStore.getActivityLevel

  activitys = activitys.map((activity) => {
    if (activity.value == selectedInStore) {
      activity.selected = !activity.selected
    }
    return activity
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
  <form class="bg-activity" @submit.prevent="goToYourGoal">
    <VtitlePage class="title-nav" title="Nivel de atividade Física?" :actions="actionsTitlePage" />
    <VBoxImgInfo
      v-for="activity in activitys"
      :data="activity"
      class="margin-y"
      :selected="activity.selected"
      @update="(e) => selectActivityLevel(e)"
    />
    <VButton text="Continuar" class="button" />
  </form>
</template>

<style scoped>
.bg-activity {
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
  .bg-activity {
    padding: 1rem;
  }
}
</style>

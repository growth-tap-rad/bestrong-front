<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.store'
import VButton from '../components/VButton.vue'
import VInputDate from '../components/VInputDate.vue'
import VtitlePage from '../components/VtitlePage.vue'
import VDropdown from '../components/VDropdown.vue'
import { useAppStore } from '../stores/app.store'

const userStore = useUserStore()
const router = useRouter()

let birthday = ref(userStore.getBirthday)
let validDate = ref(false)

let inputGender = reactive([
  { text: 'homem', value: 'man', selected: false },
  { text: 'mulher', value: 'woman', selected: false }
])

const selectBirthday = (dataString) => {
  userStore.setBirthday(dataString)
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
const selectGender = (e) => {
  inputGender = inputGender.map((opt) => {
    if (opt.value == e) {
      opt.selected = !opt.selected
      userStore.setGender(opt.value)
    } else {
      opt.selected = false
    }
    return opt
  })
}

onMounted(() => {
  const selectedGenderInStore = userStore.getGender
  inputGender = inputGender.map((opt) => {
    if (opt.value == selectedGenderInStore) {
      opt.selected = !opt.selected
    }
    return opt
  })
})

const goForDiet = () => {
  if (validDate && userStore.getGender) {
    router.push('/physical-activity-level')
    return
  }

  showToast({
    message: 'Alerta',
    description: 'Preencha todos os campos'
  })
}

const actionsTitlePage = [
  {
    btIcon: '',
    goTo: 'back'
  }
]
</script>

<template>
  <form class="bg-age" @submit.prevent="goForDiet">
    <VtitlePage title="Gênero e Data de nascimento:" :actions="actionsTitlePage" />
    <VInputDate
      title="Data nascimento:"
      @changeDate="(data) => selectBirthday(data)"
      @validDate="(bool) => (validDate = bool)"
      :value="birthday"
    />
    <VDropdown title="Gênero" :options="inputGender" @update="(e) => selectGender(e)" />
    <VButton text="Continuar" class="button" :disabled="!validDate" />
  </form>
</template>

<style scoped>
.bg-age {
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.button {
  margin: 30px 0;
  background-color: var(--button-color-light);
  max-width: 500px;
}

.input-group-append {
  cursor: pointer;
}
</style>

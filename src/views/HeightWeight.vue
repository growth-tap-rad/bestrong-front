<template>
  <div class="bg-height-wheight">
    <VtitlePage title="Altura e Peso" />
    <VInput :data="inputHeight" @update="(e) => onSelectHeight(e)" :value="userStore.getHeight" />
    <VInput :data="inputWheight" @update="(e) => onSelectWeight(e)" :value="userStore.getWeight" />
    <VButton @click="goToDiet" text="Altura e Peso" class="button" :disabled="isFetching" />

  </div>
</template>

<script setup>
import VButton from '../components/VButton.vue'
import VInput from '../components/VInput.vue'
import VtitlePage from '../components/VtitlePage.vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.store'
import * as authService from '../service/auth.service'
import * as userService from '../service/user.service'

import { ref } from 'vue';

const router = useRouter()
const userStore = useUserStore();

const isFetching = ref(false);

function onSelectHeight(e) {
  userStore.setHeight(e.replace('.', ""))
}

function onSelectWeight(e) {
  userStore.setWeight(e)
}

async function createProgress() {
  const { height, weight, activity_level, goal } = userStore.getLastProgress

  try {
    const dataProgress = await userService.createProgress({ height, weight, activity_level, goal })
    if (dataProgress) {
      createDiary();
    }
  } catch (error) {
    console.error(error.response?.data?.message || "Erro ao cadastrar Progresso")
  }
}

async function createDiary() {
  try {
    const dataDiary = await userService.createDiary()
    if (dataDiary) {
      router.push('/diet')
    }
  } catch (error) {
    console.error(error.response?.data?.message || "Erro ao cadastrar Diario")
  }
}

async function goToDiet() {

  if (!userStore.getHeight || !userStore.getWeight) {
    return
  }

  isFetching.value = true;

  const { name, email, password, username, birthday, gender } = userStore.getUser
  const [day, month, year] = birthday.split("/").map(Number)
  const birthdayFormated = `${year}-${month}-${day}`
  
  try {
    const datasSignUp = await authService.signUp({ name, email, password, username, birthday: birthdayFormated, gender })
    if (datasSignUp && datasSignUp.accessToken) {
      userStore.setToken(datasSignUp.accessToken)
    }
    console.log("datasSignUp ",datasSignUp)
  } catch (error) {
    console.error(error.response?.data?.message || "Erro ao cadastrar usuario")
    return;
  }

  createProgress();
  isFetching.value = false;
}

const inputHeight = {
  title: 'Altura',
  placeholder: 'ex: 1.70',
  mask: '#.##',
}
const inputWheight = {
  title: 'Peso',
  placeholder: 'ex: 100.00',
  mask: ['##.##', '###.##']
}

</script>

<style scoped>
.bg-height-wheight {
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100vh;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .button {
    margin: 30px 0;
    background-color: var(--button-color-light);
  }
}
</style>

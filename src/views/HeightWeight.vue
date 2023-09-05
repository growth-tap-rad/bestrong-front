<template>
  <div class="bg-altura-peso">
    <VtitlePage title="Altura e Peso" />
    <VInput :data="InputAltura" v-model="heightInput" />
    <VInput :data="InputPeso" v-model="weightInput" />
    <VButton @click="goToDiet" text="Altura e Peso" class="button" />

  </div>
</template>

<script setup>
const heightInput = ref('')
const weightInput = ref('')

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

function goToDiet() {


  userStore.setHeight(heightInput.value)
  userStore.setWeight(weightInput.value)

  const { name, email, password, username, birthday, gender } = userStore.getUser
  const { height, weight, activity_level, goal } = userStore.getLastProgress

  authService.signUp({ name, email, password, username, birthday, gender }).then(data => {
    if (data.accessToken) {
      userStore.setToken(data.accessToken)

      userService.createProgress({ height, weight, activity_level, goal }).then((data) => {
        console.log("salvou o progresso ", data)
        router.push('/diet')
      })
    }
  })



}
const InputAltura = {
  title: 'Altura',
  placeholder: 'ex:170 cm',
  mask: "X.XX",
}
const InputPeso = {
  title: 'Peso',
  placeholder: 'ex:80',
  mask: "XX.X"
}
</script>

<style scoped>
.bg-altura-peso {
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
    max-width: 500px;
  }
}
</style>

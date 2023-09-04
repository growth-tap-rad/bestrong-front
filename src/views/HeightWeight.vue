<template>
  <div class="bg-altura-peso">
    <VtitlePage title="Altura e Peso" />
    <VInput :data="InputAltura" />
    <VInput :data="InputPeso" />
    <VButton @click="goToDiet" text="Altura e Peso" class="button" />
  </div>
</template>

<script setup>

import VButton from '../components/VButton.vue'
import VInput from '../components/VInput.vue'
import VtitlePage from '../components/VtitlePage.vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.store'
import * as authService from '../service/auth.service'
const router = useRouter()
const userStore = useUserStore();

function goToDiet() {
  const name = userStore.getName
  const email = userStore.getEmail
  const password = userStore.getPassword
  const username = userStore.getUsername
  const birthday = userStore.getBirthday
  const gender = userStore.getGender
  console.log('gender ', gender, " birthday ", birthday)
  authService.signUp({ name, email, password, username, birthday, gender }).then(data => {
    if (data.accessToken) {
      userStore.setToken(data.accessToken)
      router.push('/diet')
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

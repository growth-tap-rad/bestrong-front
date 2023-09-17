<template>
  <div class="bg-height-wheight">
    <VtitlePage title="Altura e Peso" />
    <VInput :data="inputHeight" @update="(e) => onSelectHeight(e)" :value="userStore.getHeight" />
    <VInput :data="inputWheight" @update="(e) => onSelectWeight(e)" :value="userStore.getWeight"/>
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
import * as userService from '../service/user.service'

import { ref } from 'vue';

const router = useRouter()
const userStore = useUserStore();

function onSelectHeight(e){
  userStore.setHeight(e.replace('.', ""))
}

function onSelectWeight(e){
  userStore.setWeight(e)
}


function goToDiet() {

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

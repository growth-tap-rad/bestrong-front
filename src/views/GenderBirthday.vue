<template>
  <div class="bg-age">
    <VtitlePage title=" data de nascimento:" />
    <VInputDate v-model="birthday" />
    <VDropdown :data="inputGender" v-model="gender" />
    <VButton @click="goForDiet" text="Confirme a sua idade" class="button" />

  </div>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.store';
import VButton from '../components/VButton.vue'
import VInputDate from '../components/VInputDate.vue'
import VtitlePage from '../components/VtitlePage.vue'
import VDropdown from '../components/VDropdown.vue'
import { ref } from 'vue';

const userStore = useUserStore()
const router = useRouter()
const birthday = ref(Date)
const gender = ref('')

const inputGender = {
  title: 'Selecione seu gênero',
  options: {
    item: { text: 'homem', value: 'man' }, item2: { text: 'mulher', value: 'women' }
  },
}
function goForDiet() {

  userStore.setGender(gender.value)
  userStore.setBirthday(birthday.value)


  router.push('/physical-activity-level')
}



</script>

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
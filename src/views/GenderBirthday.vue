<template>
  <div class="bg-age">
    <VtitlePage title=" data de nascimento:" />
    <VInputDate @update="(e) => selectBirthday(e)" :dataValue="birthday"/>
    <VDropdown :options="inputGender" @update="(e) => selectGender(e)" />
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
import { ref, reactive, onMounted } from 'vue';

let birthday = ref(Date);

const userStore = useUserStore()
const router = useRouter()

let inputGender = reactive([
  { text: 'homem', value: 'man', selected: false }, { text: 'mulher', value: 'woman', selected: false }])

function selectBirthday(e){
  console.log(e)
  userStore.setBirthday(e)
}
function selectGender(e) {

  inputGender = inputGender.map(opt => {
    if (opt.value == e) {
      opt.selected = !opt.selected
      userStore.setGender(opt.value)
    }
    else {
      opt.selected = false
    }
    return opt;
  })

}

onMounted(() => {
  const selectedBithdayInStore = userStore.getBirthday
  birthday.value = selectedBithdayInStore
  const selectedInStore = userStore.getGender

  inputGender = inputGender.map(opt => {
    if (opt.value == selectedInStore) {
      opt.selected = !opt.selected
    }
    return opt;
  })
})

function goForDiet() {
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
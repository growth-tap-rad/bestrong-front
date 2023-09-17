<template>
  <div class="bg-age">
    <VtitlePage title="Gênero e Data de nascimento:" />
    <VInputDate title="Data nascimento:" @changeDate="(e) => selectBirthday(e)" @validDate="bool => validDate = bool" :value="birthday" />
    <VDropdown title="Gênero" :options="inputGender" @update="(e) => selectGender(e)" />
    <VButton @click="goForDiet" text="Confirme a sua idade" class="button" :disabled="!validDate"/>

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

const userStore = useUserStore()
const router = useRouter()

let birthday = ref(userStore.getBirthday);
let validDate = ref(false);


let inputGender = reactive([
  { text: 'homem', value: 'man', selected: false }, { text: 'mulher', value: 'woman', selected: false }])


function selectBirthday(dataString){
  userStore.setBirthday(dataString)
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

  const selectedGenderInStore = userStore.getGender
  inputGender = inputGender.map(opt => {
    if (opt.value == selectedGenderInStore) {
      opt.selected = !opt.selected
    }
    return opt;
  })
})

function goForDiet() {
  if(validDate){
    router.push('/physical-activity-level')
  }
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
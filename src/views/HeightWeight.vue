<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.store'
import { useHeightWeightStore } from '../stores/height.weight.store';
import VButton from '../components/VButton.vue'
import VInput from '../components/VInput.vue'
import VtitlePage from '../components/VtitlePage.vue'


const HeightWeightStore = useHeightWeightStore()

const router = useRouter()
const userStore = useUserStore();

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
const isFetching = ref(false);

const onSelectHeight = (e) => {
  userStore.setHeight(e.replace('.', ""))
}

const onSelectWeight = (e) => {
  userStore.setWeight(e)
}

const goToDiet = () => {

  if (!userStore.getHeight || !userStore.getWeight) {
    return
  }

  isFetching.value = true;

  const { name, email, password, username, birthday, gender } = userStore.getUser

  const [day, month, year] = birthday.split("/").map(String)
  const birthdayFormated = `${year}-${month}-${day}`

  HeightWeightStore.signUp({
    name,
    email,
    password,
    username,
    birthday: birthdayFormated,
    gender
  }).then((datasSignUp) => {
    if (datasSignUp && datasSignUp.accessToken) {
      userStore.setToken(datasSignUp.accessToken)

      const { height,
        weight,
        activity_level,
        goal } = userStore.getLastProgress

        HeightWeightStore.createProgress({
        height,
        weight,
        activity_level,
        goal
      }).then((dataProgress) => {
        if (dataProgress) {
          HeightWeightStore.createDiary()
          .then(() => {
              router.push('/diet')
            })
            .catch(() => {
              console.error(error.response?.data?.message || "Erro ao cadastrar usuario")
              return;
            })
        }
      })
    }
  })

  isFetching.value = false;
}
</script>

<template>
  <div class="bg-height-wheight">
    <VtitlePage title="Altura e Peso" />
    <VInput :data="inputHeight" @update="(e) => onSelectHeight(e)" :value="userStore.getHeight" />
    <VInput :data="inputWheight" @update="(e) => onSelectWeight(e)" :value="userStore.getWeight" />
    <VButton @click="goToDiet" text="Altura e Peso" class="button" :disabled="isFetching" />
  </div>
</template>

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

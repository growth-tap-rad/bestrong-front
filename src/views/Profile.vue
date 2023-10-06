<script setup>
import { onMounted, ref } from 'vue';

import { useProfileStore } from '../stores/profile.store';
const profileStore = useProfileStore()

let user = ref({})
onMounted(() => {
  profileStore.getProgress()
    .then((data) => {
      user.value = data[0]
    })
})

</script>
<template>
  <h1>perfil</h1>
  <span>peso: {{ user.weight }}</span>
  <span>Altura : {{ user.height }}</span>
</template>
<style scoped></style>
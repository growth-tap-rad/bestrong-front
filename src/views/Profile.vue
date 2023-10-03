<script setup>
import { onMounted, ref } from 'vue';
import * as userService from '../api/resources/user.service'

let user = ref({})
onMounted(() => {
  userService.getProgress()
    .then((data) => {
      console.log(data)
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
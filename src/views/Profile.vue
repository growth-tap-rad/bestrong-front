<script setup>
;

import { onMounted, ref } from 'vue';
import { useProfileStore } from '../stores/profile.store';
const profileStore = useProfileStore()

import { useProfileStore } from '../stores/profile.store';
const profileStore = useProfileStore()
let mostrar = true
let user = ref({})
onMounted(() => {
  profileStore.getProgress()
    .then((data) => {
      user.value = data[0]
    })
})

</script>
<template >
  <!--   <h1>perfil</h1>
  <span>peso: {{ user.weight }}</span>
  <span>Altura : {{ user.height }}</span> -->

  <div v-show="mostrar" class="toast show "  role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">

      <strong class="me-auto">Bootstrap</strong>

      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</template>
<style scoped>
.meal {
  position: fixed;
  bottom: 0;
}
</style>
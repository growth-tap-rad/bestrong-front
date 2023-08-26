<template>
  <div class="bg-age">
    <VtitlePage title="Qual a sua idade?" />
    <VInputDate :data="InputAge" />
    <VButton text="Confirme a sua idade" class="button" />

  </div>
</template>

<script setup>
import VButton from '../components/VButton.vue'
import VInputDate from '../components/VInputDate.vue'
import VtitlePage from '../components/VtitlePage.vue'


const InputAge = {
  title: 'Selecione a sua data de nascimento:'
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
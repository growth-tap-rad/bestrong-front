<template>
  <div class="bg-altura-peso">
    <VtitlePage title="Altura e Peso" />

    <VInput :data="InputAltura" />
    <VInput :data="InputPeso" />

    <VButton text="Altura e Peso" class="button" />
  </div>
</template>

<script setup>
import VButton from '../components/VButton.vue'
import VInput from '../components/VInput.vue'
import VtitlePage from '../components/VtitlePage.vue'

const InputAltura = {
  title: 'Altura',
  placeholder: 'ex:170 cm',
  mask: "X.XX",
}
const InputPeso = {
  title: 'Peso',
  placeholder: 'ex:80',
  mask:"XX.X"
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

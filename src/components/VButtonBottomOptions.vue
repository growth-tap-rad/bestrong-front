<script setup>

import { defineEmits } from 'vue';
const emit = defineEmits()
const props = defineProps({
  show: true
})


const handleClickOutside = () => {

  emit('hideButtonBottomOptions')

};
</script>
<template>
  <div class="bg" v-show="props.show" @click="handleClickOutside"></div>
  <div v-show="props.show" class="buttons">
    <div class="botaosuperior">
      <button class="button">
        <i class="bi bi-arrow-clockwise"></i>
        <span class="text">Adicionar peso</span>
      </button>
      <button class="button">
        <i class="bi bi-universal-access"></i>
        <span class="text">Adicionar treino</span>
      </button>
      <button class="button">
        <i class="bi bi-person-up"></i>
        <span class="text">Adicionar exercicio</span>
      </button>
    </div>
    <div class="botaoinferior">
      <button class="button">
        <i class="bi bi-cup-straw"></i>
        <span class="text">Adicionar Alimento</span>
      </button>
      <button class="button">
        <i class="bi bi-droplet"></i>
        <span class="text">Adicionar Agua</span>
      </button>
    </div>



  </div>
</template>

<style scoped>
.bg {
  display: block;
  position: fixed;
  background-color: var(--bg-color-dark4);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2;
}

.buttons {
  position: fixed;
  z-index: 4;
  width: 100%;
  bottom: 0;
  height: 30vh;
  margin-bottom:5em;

  .botaosuperior,
  .botaoinferior {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3em;

    .button {
      width: 5em;
      display: flex;
      flex-direction: column;
      align-items: center;

      background-color: var(--bg-color-dark2);
      border: none;
      color: var(--button-color-aqua);

      .text {
        font-size: 1em;
      }
    }
  }

  .botaosuperior {
    margin-bottom: 3em;
  }

}
</style>
<template>
  <button :style="buttonStyle">
    <h1>{{ atividade.titulo }}</h1>
    <span>{{ atividade.paragrafo }}</span>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  atividade: {
    type: Object
  }
});

const buttonStyle = {
  backgroundImage: `url(${props.atividade.imagem})`,
  width: '300px',
  height: '150px',
  cursor: 'pointer'

};
</script>

<style>
span{
  color: white;
}
button {
  width: var(--button-width);
  height: var(--button-height);
  cursor: var(--button-cursor);
  background-size: cover;
  box-shadow: 10px 10px 10px   black;
}
</style>

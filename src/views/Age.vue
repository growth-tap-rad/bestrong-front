<template>
    <div class="bg-age">
      <VtitlePage title="Qual a sua idade?" />
  
      <VInput :data="InputAge" />
      <VButton text="Age" class="button" />
    </div>
  </template>
  
  <script setup>
  import VButton from '../components/VButton.vue'
  import VInput from '../components/VInput.vue'
  import VtitlePage from '../components/VtitlePage.vue'
  const InputAge = {
    title: 'Age',
    placeholder: 'ex: 25'
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
  
    .button {
      margin: 30px 0;
      background-color: var(--button-color-light);
      max-width: 500px;
    }
  }
  </style>
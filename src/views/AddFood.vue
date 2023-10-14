<script setup>
import VButton from '../components/VButton.vue';
import VButtonArrowLeft from '../components/VButtonArrowLeft.vue';
import VtitlePage from '../components/VtitlePage.vue';

</script>
<template>
  <section class="main">
    <header class="header">
      <nav class="nav">
        <VButtonArrowLeft @click="backToLogin" />
      </nav>
      <VtitlePage class="title-page " title="Alimento" />
      <nav class="nav"></nav>
    </header>
    <div class="food-selected">
      <span class="food">Pão Integral</span>
      <div class="inputs">
        <input class="input" type="number">
        <input class="input" type="text">
        <span>80 gramas</span>

      </div>

      <div class="macros">
        <span>100Kcal</span>
        <span>30 Prot</span>
        <span>65 Carb</span>
        <span>9 Gord</span>
        <span>30 Fibra</span>
        <span>65 Sódio</span>


      </div>
      <VButton :text="'ADICIONAR'" />

    </div>
  </section>
</template>
<style scoped>
.main {
  color: white;
  background-color: var(--bg-color-dark);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;


  .header {

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;


    .nav {
      margin-bottom: 20px;
    }

    .title-page {
      color: var(--text-color-light);
      font-size: 20px;
      text-align: center;
    }
  }

  .food-selected {
    display: flex;
    flex-direction: column;
    width: 95%;


    .food {
      width: 100%;
      text-align: center;
      background-color: black;
      height: 2em;
    }

    .inputs {
      display: flex;
      gap: 20px;

      .input {
        background-color: transparent;
        border: none;
        border-bottom: 1PX solid gray;
      }

    }


  }
}</style>

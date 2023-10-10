<script setup>
const props = defineProps({
  show: true
})

</script>
<template>
  <div v-show="props.show" class="buttons">
    <div class="botaosuperior">
      <button class="button">x</button>
      <button class="button">x</button>
      <button class="button">x</button>
    </div>
    <div class="botaoinferior">
      <button class="button">x</button>
      <button class="button">x</button>
    </div>



  </div>
</template>

<style scoped>
.buttons {

  width: 10em;
  height: 30vh;
  bottom: 0;
  flex-direction: column;
  margin: auto;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  background-color: bisque;

  .botaoinferior,
  .botaosuperior {
    display: flex;
    justify-content: space-around;

    .button {

      width: 2em;
      height: 2em;
      background-color: aqua;
      border: none;

    }
  }

}
</style>
<script setup>
const props = defineProps({
  options: {
    type: Array, required: true, default: () => [
      { text: 'homem', value: 'man', selected: false }, { text: 'mulher', value: 'woman', selected: false }
    ]
  },
})

</script>
<template>
  <div class="inputs">
    <select class="form-select input" aria-label="Gender" @input="$emit('update', $event.target.value)">
      <option selected disabled class="option">Selecione seu gênero</option>
      <option v-for="(item, index) in props.options" class="option" :value="item.value" :selected="item.selected">{{ item.text }} </option>
    </select>
  </div>
</template>
<style scoped>
.inputs {
  display: flex;
  flex-direction: column;
  width: 100%;

  .input {
    padding: 10px;
    border-radius: 8px;
    background-color: var(--bg-color-light);
    color: var(--bg-color-dark);
    border: none;
    width: 100%;
    max-width: 200px;


  }

}
</style>
<script setup>
const props = defineProps({
  options: {
    type: Array, required: true, default: () => [
      { text: 'homem', value: 'man', selected: false }, { text: 'mulher', value: 'woman', selected: false }
    ]
  },
  title: {
    type: String,
    default: ''
  }
})

</script>
 
<template>
  <div class="inputs">
    <label for="date" class="label" v-if="props.title">{{ props.title }}</label>
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

  .label {
    color: var(--bg-color-light);
    padding: 15px 0;
  }


  .input {
    padding: 10px;
    border-radius: 8px;
    background-color: var(--bg-color-grey);
    color: var(--bg-color-light);
    border: none;
    width: 100%;
    cursor: pointer;

    option {
      border-radius: 8px;
    }

  }

}
</style>
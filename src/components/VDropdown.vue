<script setup>
const props = defineProps({
  options: {
    type: Array, required: true, default: () => [
      { text: 'homem', value: 'man', selected: false, disabled: false },
      { text: 'mulher', value: 'woman', selected: false, disabled: false }
    ]
  },
  title: {
    type: String,
    default: ''
  },
  firstOpt: {
    type: String,
    default: 'Selecione seu gênero'
  },
  listDisabled: {
    type: Boolean,
    default: false
  }
})


</script>
 
<template>
  <div class="inputs">
    <label for="date" class="label" v-if="props.title">{{ props.title }}</label>
    <select class="form-select input" aria-label="Gender" @input="$emit('update', $event.target.value)">
      <option selected disabled class="option"> {{ props.firstOpt }}</option>
      <option v-for="(item, index) in props.options" class="option" :class="{ 'list-disabled': listDisabled }"
        :value="item.value" :selected="item.selected" :disabled="item.disabled || false">{{
          item.text }} </option>
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

    .option {
      border-radius: 8px;

      &.list-disabled {
        color: rgb(194, 194, 194);
      }

    }

  }

}
</style>
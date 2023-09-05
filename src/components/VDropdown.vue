<script setup>
defineProps({
  data: {
    type: Object,
  }
})

</script>
<template>
  <div class="inputs">
    <select class="form-select" aria-label="Gender"   @input="$emit('update:modelValue', $event.target.value)">
      <option selected disabled>Selecione seu gênero</option>
      <option v-for="item in data.options" :value="item.value" class="input">{{ item.text }} </option>
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
    padding: 15px;

  }

  .box-input {
    position: relative;

    .input {
      padding: 10px 10px 10px 45px;
      border-radius: 8px;
      background-color: var(--bg-color-grey);
      color: var(--text-color-light2);
      border: none;
      width: 100%;
    }

    .icon {
      padding: 0;
      font-size: 20px;
      top: calc(50% - 15px);
      left: 15px;
      color: var(--text-color-light2);
      position: absolute;
    }
  }
}
</style>
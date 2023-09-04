<script setup>

</script>

<template>
  <div class="inputs" id="datepicker">
    <input type="date" class="input" id="date" @input="$emit('update:modelValue', $event.target.value)" />
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

  .input {
    padding: 10px;
    border-radius: 8px;
  }
}
</style>

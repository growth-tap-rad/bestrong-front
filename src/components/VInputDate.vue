<script setup>
const props = defineProps({
  dataValue: Date
})
</script>

<template>
  <div class="inputs" id="datepicker">
    <input type="date" class="input" id="date" :value="props.dataValue" @input="$emit('update', $event.target.value)" />
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
    color: var( --bg-color-dark);
  }
}
</style>

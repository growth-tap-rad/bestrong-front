<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      placeholder: '',
      type: 'text'
    })
  }
})
</script>

<template>
  <div class="inputs">
    <label :for="data.title" class="label">{{ data.title }}</label>
    <input :type="data.type" :id="data.title" class="input" :placeholder="data.placeholder" />
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

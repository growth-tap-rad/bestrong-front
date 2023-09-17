<script setup>

defineProps({
  text: {
    type: String,
    default: "Texto",
    required: true
  },
  disabled: false
})
</script>

<template>
  <button class="btn button-text" :disabled="disabled">{{ text }}</button>
</template>

<style scoped>
.button-text {
  padding: 15px 0;
  font-size: 1rem;
  border: none;
  border-radius: 50px;
  color: var(--text-color-light);
  font-weight: bold;
  width: 100%;
}

.btn {
  background-color: var(--button-color-light);
}
</style>
<script setup>

defineProps({
  title: {
    type: String,
    default: "Titulo",
    required: true
  }
})
</script>

<template>
  <h2 class="title">{{title}}</h2>
</template>

<style scoped>
  .title {
    color: var(--text-color-light);
  }
</style>
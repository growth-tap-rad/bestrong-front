<template>
  <div class="progress" role="progressbar" aria-label="progress bar" :aria-valuenow="percentage" aria-valuemin="0"
    aria-valuemax="100">
    <div class="progress-bar" :style="progressBarStyle"></div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
});

const progressBarStyle = computed(() => {
  const widthPercentage = Math.min(Math.max(props.percentage, 0), 100);
  return { width: `${widthPercentage}%` };
});

</script>

<style scoped>
.progress-bar {
  background-color: var(--text-color-highlighted2);
}
</style>